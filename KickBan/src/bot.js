// Classes
require('dotenv').config();
const { Client } = require('discord.js');

// Constants
const client = new Client();
const PREFIX = "$";

// Initialisation
client.login(process.env.TOKEN_BOT_FIRST);
client.on('ready', () => {
    console.log(`${client.user.username} has logged in`);
});

// Event handler
client.on('message', (message) => {
    if (message.author.bot || !message.content.startsWith(PREFIX))
        return;
    
    const [COMMAND, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
    
    if (COMMAND === 'kick' || COMMAND === 'ban')
        kick_ban(message, args, COMMAND);
});


// Utility functions
function getid(args){
    let ids = [];
    for (let i=0;i<args.length;i++)
        if(!message.guild.members.cache.get(args[i]))
            ids.push(args[i].slice(3, -1));
        else 
            ids.push(args[i]);
    return ids;
}

// Command functions
function kick_ban(message, args, COMMAND){
    if (args.length === 0)
        return message.reply("Please provide an id");
    if((!message.member.hasPermission('KICK_MEMBERS') && COMMAND === "kick") || (!message.member.hasPermission('BAN_MEMBERS') && COMMAND === "ban"))
        return message.reply("You do not have permission to use the command");
    let ids = getid(args);
    const member = message.guild.members.cache.get(ids[0]);
    if (member && COMMAND === "kick")
        member.kick()
        .then((member) => message.channel.send(`${member} was kicked by ${message.author}`))
        .catch((err) => message.channel.send("I do not have permission"));
    else if(member && COMMAND === 'ban')
        message.guild.members.ban(ids[0])
        .then((member) => message.channel.send(`${member} was banned by ${message.author}`))
        .catch((err) => message.reply("I do not have the permissions"));
    else
        message.channel.send("Member not found");
}