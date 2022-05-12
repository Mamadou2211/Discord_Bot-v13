const { MessageAttachment, MessageEmbed } = require("discord.js")
const { profileImage } = require("asure");

module.exports = {
    name: 'imagebanner',
    aliases: ['img'],
    description: "Sends the image generation of the user",
    cooldown: 5,
    run: async (client, message, args) => {
const target = message.mentions.users.first()
    if (!target) {
      return message.reply({content: "You Need To Tag The User"}).then(msg => {
    setTimeout(() => {
    msg.delete();
    }, 5000);
    })  
    }

        const bufferImg = await profileImage(target);
        const imgAttachment = new MessageAttachment(bufferImg, "profile.png")
      

        message.reply({ files: [imgAttachment] });
    }
}