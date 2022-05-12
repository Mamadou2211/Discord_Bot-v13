const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "hack",
  description: "hack a user (fake)",
  cooldown: 0,
  run: async (client, message, args) => {
    const eMails = [
      //add your own 
    ];
    const emailRandom = Math.floor(Math.random() * eMails.length);

    const password =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

    const taggedUser = message.mentions.users.first();
    if (!taggedUser) {
      return message.channel.send("Please mention somebody to hack!").then(msg => {
    setTimeout(() => {
    msg.delete();
    }, 3000);
    })  
    }
    const embed = new MessageEmbed()
      .setAuthor(
        `${taggedUser.tag} Got Hacked!`,
        taggedUser.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `**__Found Info!__**\n> Emails: ${eMails[emailRandom]}\n> Password: ${password}\n`
      )
      .setColor(message.guild.me.displayHexColor)

    message.channel.send({content: `Hacking  **${taggedUser.tag}**...`}).then(msg => {
    setTimeout(() => {
    msg.delete();
    }, 1000);
    })  
    
    
    const embed1 = new MessageEmbed()
      .setAuthor(
        `getting info of ${taggedUser.tag}`,
        taggedUser.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `Successfully hacked **${taggedUser.tag}**! Fetching... ⏲️`
      )
      .setColor(message.guild.me.displayHexColor)
      .setFooter("Fetching");
  
message.channel.send({embeds: [embed1]}).then(msg => {
    setTimeout(() => {
    msg.delete();
    message.channel.send({embeds: [embed]});
    }, 5000);
    })  
  },
};