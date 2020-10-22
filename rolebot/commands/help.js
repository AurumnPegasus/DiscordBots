const config = require('../config/config.json');
const PREFIX = config.DISCORD_BOT.PREFIX;

module.exports = {
    name: 'help',
    description: 'Describes various commands and thier uses',
    usage: '[command name]',
    execute (message, args){
        const { commands } = message.client;
        let data = commands.map(command => command);
        let reply = 'I heard you needed some help :) \n';
        if(!args.length){
            reply += 'Here is a list of all my commands: \n\n';
            for(var i=0;i<data.length;i++)
            {
                reply += data[i].name + " : " + data[i].description + "\n";
                reply += "Usage: " + PREFIX + data[i].name + " " + data[i].usage + "\n";
                reply += "\n";
            }
            const embed = {
                color: '0304CF',
                title: "Help Message",
                description: reply
            }
            message.channel.send({ embed: embed });
        }
        else if(args.length === 1){
            try{
                reply += '\nThis command is used for: \n'
                var commandExist = false;
                for(var i=0;i<data.length;i++)
                {
                    if(data[i].name === args[0].trim())
                    {
                        commandExist = true;
                        reply += data[i].description + "\n\n";
                        reply += 'Correct way to use this command is: \n';
                        reply += PREFIX + data[i].name + " " + data[i].usage + "\n";
                        break;
                    }
                }
                if(!commandExist)
                    return message.reply(`Invalid command, try using \`?help\``);    
                const embed = {
                    color: '0304CF',
                    title: "Help Message",
                    description: reply
                }
                message.channel.send({embed: embed});
            }
            catch{
                message.reply(`Invalid syntax, try using \`?help\``);
            }
        }
        else{
            message.reply("Search for one argument at a time");
        }
    }
};