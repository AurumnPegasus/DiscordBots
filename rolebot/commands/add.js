module.exports = {
    name: 'add',
    description: 'Adds specified role to the author',
    usage: '<role>, <role> ...',
    args: true,
    execute(message, args){
        roleSet = new Set(args);
        message.reply("Updates about the roles");
        roleSet.forEach(roleName => addRole(message, roleName));
    }
};

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