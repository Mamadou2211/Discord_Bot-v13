const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Show the help page.',
    run: async(client, message, args) => {
      let embed = new MessageEmbed()
      .setTitle(`${client.user.username}'s Help Page`)
      .setDescription(`This help page shows all the command of this bot.\n\n**Commands**\n\`help\`\nShow the help page.\n\n\`ping\`\nReturns bot ping. `)
      .setFooter(`Subscribe to Cody Dimensions YouTube Channel`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
      message.channel.send({ embeds: [embed] });

    }
    
}
