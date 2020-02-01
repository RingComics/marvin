module.exports = {
	name: "help",
	description: "Displays help message",
	execute(message, args, Discord, fs) 
	{
		var helpMessage = new Discord.RichEmbed()
			.setTitle('Help');
		helpMessage.addField(name="!help", value="Displays this message", inline=false);
		helpMessage.addField(name="!scp [number]", value="Fetches an SCP article", inline=false);
		helpMessage.addField(name="!info", value="Displays info about me", inline=true);
		message.channel.send(helpMessage);
	},
};