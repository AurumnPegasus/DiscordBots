module.exports = {
    name: 'mention',
    description: 'Tags the mentioned users or role a given amount of times',
    usage: '<tag>, <number>',
    argsLength: 2,
    execute(message, args){
        callName(message, args[0], args[1]);
        return;
    }
}

function callName(message, name, number){
    let userID = name.trim().substring(3);
    let char = name.trim().charAt(2);
    userID = userID.substring(0, userID.length - 1);
    let reply;
    if( userID.length > 0 && (message.guild.member(userID) || message.guild.roles.cache.find(role => role.id === userID)))
        reply =  getString(userID, char, number);
    else
        return message.channel.send("No such username or role exists");
    if(reply.length <= 1950)
        message.channel.send(reply);
    else{
        message.channel.send("You can only send upto 2000 characters in one message.");
        message.channel.send("Please revise your input appropriately.");
    }
    return;
}

function getString(ID, char, number){
    username = "<@" + char + ID + ">";
    let reply = " ";
    for(let i=0;i<number;i++)
        reply += " " + username;
    return reply;
} 