const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Returns bot ping.',
    run: async(client, message, args) => {
      const z = new MessageEmbed()
      .setDescription('Pinging')
     const aa = new MessageEmbed()
      .setDescription(`Pong! **${client.ws.ping} ms**`)
        const msg = await message.channel.send({embeds: [z]})
        await msg.edit({embeds: [aa]})
    }
}