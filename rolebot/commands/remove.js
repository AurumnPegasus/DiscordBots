module.exports = {
    name: 'remove',
    description: 'Removes the specified role from the author',
    usage: '<role>, <role> ... ',
    args: true,
    execute(message, args){
        roleSet = new Set(args);
        message.reply("Updates about the roles");
        roleSet.forEach(roleName => removeRole( message, roleName));
    }
}

function removeRole(message, args){
    args = args.trim();
    let { cache } = message.guild.roles;
    let role = cache.find(role => role.name === args);
    if(role){
        if(message.member.roles.cache.has(role.id))
            message.member.roles.remove(role)
            .then(() => message.channel.send(`${args} role removed from ${message.author}`))
            .catch((err) => message.channel.send(`I do not have permission to manage ${args} role`));      
        else 
            return message.channel.send(`You do not have ${args} role`);
    }
    else 
        return message.channel.send(`${args} role does not exist`);
}