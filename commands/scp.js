module.exports = {
	name: "scp",
	description: "Fetches an SCP article",
    execute(message, args, Discord, fs, rp, cheerio) 
    {
        //Eventually replace with scpInfo.json only
        var titles = require('../json/scpTitles.json');
        var readings = require('../json/scpReadings.json');
        var objectNumber = args[0];
        var itemNumber = "SCP-" + objectNumber;
        var objectInteger = Number(objectNumber)
        if(objectInteger <= 999)
        {
            var series = "I";
            var seriesURL = "scp-series";
        }
        if(objectInteger <= 1999 && objectInteger >= 1000)
        {
            var series = "II";
            var seriesURL = "scp-series-2";
        }
        if(objectInteger <= 2999 && objectInteger >= 2000)
        {
            var series = "III";
            var seriesURL = "scp-series-3";
        }
        if(objectInteger <= 3999 && objectInteger >= 3000)
        {
            var series = "IV";
            var seriesURL = "scp-series-4";
        }
        if(objectInteger <= 4999 && objectInteger >= 4000)
        {
            var series = "V";
            var seriesURL = "scp-series-4";
        }
        var objectClass = "[REDACTED]";
        var procedures = "[REDACTED]";
        var description = "[REDACTED]";
        var title = "[REDACTED]";
        var html = 
        {
            uri: 'http://www.scp-wiki.net/scp-' + objectNumber,
            transform: function (body) 
            {
                return cheerio.load(body);
            }
        };
        var msg = "That SCP could not be found!"
        rp(html)
            .then(($) =>
            {
                $('#page-content').children('p').each(function (i, elem)
                {
                    var content = $(this).text()
                    if(content.includes('Item #:'))
                    {
                        itemNumber = content.replace('Item #:',"")
                    }
                    if(content.includes('Object Class:'))
                    {
                        objectClass = content.replace('Object Class:',"")
                    }
                    if(content.includes('Special Containment Procedures:'))
                    {
                        procedures = content.replace("Special Containment Procedures:","");
                    }
                    if(content.includes("Description"))
                    {
                        description = content.replace("Description: ","")
                    }
                    
                });
                var scp = "SCP-" + objectNumber;
                msg = new Discord.RichEmbed()
                    .setTitle(titles[scp])
                    .setDescription("Series " + series)
                    .setURL('http://www.scp-wiki.net/scp-' + objectNumber)
                    .attachFiles(['./scpLogo.png'])
                    .setThumbnail('attachment://scpLogo.png')
                    .addField('Item #: ',itemNumber, true)
                    .addField('Object Class: ',objectClass,true)
                    .addField('Special Containment Procedures:',procedures)
                    .addField('Description:',description)
                    .setImage($('.scp-image-block').find('img').attr('src'))
                    .setFooter($('.scp-image-block').find('.scp-image-caption').text());
                if(readings[scp]) msg.addField('Volgun Reading:',readings[scp])
                message.channel.send(msg);
            })
            .catch((err) => 
            {
                console.log(err);
            });
	}
};