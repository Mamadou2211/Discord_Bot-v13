const { Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
module.exports = {
    name: "avatar",
    description: "Display's Your Avatar Or The Mentioned User's Avatar",
    aliases: ["av", "pfp", "icon", "avt"],
    usage: "&avatar<@user>",
    run : async(client, message, args) => {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let embed = new MessageEmbed()
        .setTitle(`${user.username}'s Avatar`, user.displayAvatarURL({ size: 4096, dynamic: true }))
        .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
        .setTimestamp()
        .setFooter(`Requested By ${user.tag}`, message.author.displayAvatarURL)
      const row = new MessageActionRow()
        {row.addComponents(
           new MessageButton()
            .setStyle("LINK")
            .setURL(user.displayAvatarURL({ size: 4096, dynamic: true, format: "png" }))
            .setLabel("PNG Avatar")
          )
        row.addComponents(
           new MessageButton()
            .setStyle("LINK")
            .setURL(user.displayAvatarURL({ size: 4096, dynamic: true, format: "jpg" }))
            .setLabel("JPG Avatar")
          )
        row.addComponents(
           new MessageButton()
            .setStyle("LINK")
            .setURL(user.displayAvatarURL({ size: 4096, dynamic: true, format: "webp" }))
            .setLabel("WEBP Avatar")
          )}
        message.channel.send({ embeds: [embed],  components: [row] })
    }
}