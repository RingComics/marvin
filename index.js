const fs = require("fs");
const Discord = require('discord.js');
const rp = require('request-promise');
const cheerio = require('cheerio');
const { prefix, token } = require('./json/config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles)
{
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on("message", message =>
{
	if(message.author.bot)return;
	if(!message.content.startsWith(prefix)) return;

	var args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	try 
	{
		client.commands.get(commandName).execute(message, args, Discord, fs, rp, cheerio);
	} 
	catch (error) 
	{
		console.error(error);
		message.reply("I couldn't execute that command!");
	}
});

client.login(token);