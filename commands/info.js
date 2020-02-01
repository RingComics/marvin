module.exports = {
	name: "info",
	description: "My info",
    execute(message, args, Discord, fs, rp, cheerio) 
    {
        var infoMessage = new Discord.RichEmbed()
			.setTitle('marvin')
			.setURL('https://github.com/RingComics/marvin')
			.setAuthor('RingComics',"", 'https://github.com/RingComics')
			.setDescription('I fetch SCP links and try not to think about the impending heat death of the Universe')
			.addField('Version', '1.0')
			.addField('Written using', 'JavaScript, Node.JS, Discord.JS')
			.addField('Based on:', '/u/The-Paranoid-Android on Reddit')
			.setTimestamp();
		message.channel.send(infoMessage);
		message.delete();
    }
}