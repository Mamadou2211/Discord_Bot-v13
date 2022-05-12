
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'count',
    description: 'Infomation of this server',
  aliases: ["memberc", "mc", "countmember", "countm"],
    guildOnly: true,
    run : async(client, message, args) => {
			let embed = new MessageEmbed()
      .setTitle(`Total Members Of ${message.guild.name}`)
      .addField(`👥Total Users`, `${message.guild.memberCount}`, true)
      .addField(`👤Humans`, `${message.guild.members.cache.filter(member => !member.user.bot).size}`, true)
        .addField(`🤖Cybrogs`, `${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
      .setThumbnail(message.guild.iconURL({ size: 4096, dynamic: true }))
      .setAuthor(message.guild.name, message.guild.iconURL({ size: 4096, dynamic: true }))
      .setTimestamp()
      .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL)
      message.channel.send({ embeds: [embed] })

	}
}