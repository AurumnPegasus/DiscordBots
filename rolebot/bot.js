// Imports
const discord = require('discord.js')
const client = new discord.Client();
const config = require('./config/config.json');

// Initialisation
const PREFIX = config.DISCORD_BOT.PREFIX;
client.login(config.DISCORD_BOT.TOKEN);
client.on('ready', () => {
    console.log(`${client.user.tag} has logged in `);
});

// Event listeners
client.on('message', (message) => {
    if(message.author.bot || !message.content.startsWith(PREFIX))
        return;
    
    let command, roleSet, args;
    if(message.content.indexOf(" ") <= 0)
        command = message.content.trim().substring(PREFIX.length);
    else
    {
        command = message.content.trim().substring(0, message.content.indexOf(" ")).substring(PREFIX.length);
        args = message.content.trim().substring(command.length + 1).split(",");
        roleSet = new Set(args);
    }
    if (command === 'add')
    {
        message.reply("Updates about the roles");
        roleSet.forEach(roleName => addRole(message, roleName));
    }
    else if(command === 'remove')
    {
        message.reply("Updates about the roles");
        roleSet.forEach(roleName => removeRole( message, roleName));
    }
    else if(command === 'help')
    {
        helpMe(message);
    }
});

// Command function
function addRole(message, args){
    args = args.trim();
    let { cache } = message.guild.roles;
    let role = cache.find(role => role.name === args);
    if (role){
        if(message.member.roles.cache.has(role.id))
            return message.channel.send(`You already have ${args} role`);
        message.member.roles.add(role)
        .then(() => message.channel.send(`${args} role given`))
        .catch((err) => console.log(err));
    }
    else    
        return message.channel.send(`${args} role does not exist`);
}

function removeRole(message, args){
    args = args.trim();
    let { cache } = message.guild.roles;
    let role = cache.find(role => role.name === args);
    if(role){
        if(message.member.roles.cache.has(role.id))
            message.member.roles.remove(role)
            .then(() => message.channel.send(`${args} role removed from ${message.author}`))
            .catch((err) => console.log(err));      
        else 
            return message.channel.send(`You do not have ${args} role`);
    }
    else 
        return message.channel.send(`${args} role does not exist`);
}

function helpMe(message){
    let embedContent = " Hey, I head you asked for help :) \n" + 
    "This is a fairly simple bot to use \n" + " There are three commands \n"
    + "?add <Role1> <Role2> .. \n" + "This will allocate you the mentioned role \n" + 
    "?remove <Role1> <Role2> .. \n" + " This will remove mentioned role from you \n" + 
    "?help \n" + "This will bring you here :)" 
    let embed = {
        title: "Help Message",
        description: embedContent,
        color: '3C35E9',
    };
    message.channel.send({ embed: embed});
}