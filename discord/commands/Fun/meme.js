const request = require('node-superfetch');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: "meme",
  description: "Meme command",
  
  run: async (client, message, args) => {
    const topics = [
            "memes",
            "me_irl",
            "dankmemes",
            "comedyheaven",
            "Animemes"
    ];

    async function meme (topics) {
        const topic = topics[Math.floor(Math.random() * topics.length)];
            
        const { body } = await request.get(`https://www.reddit.com/r/${topic}/random/.json`);

        const data = Object.entries(Object.values(body[0]['data'].children))[0][1].data

        return data;                
    }

    
    let Embed;
    meme(topics).then(async function(data) {
        Embed = new MessageEmbed()
        .setColor("#36393F")
        .setURL(`https://www.reddit.com/${data.permalink}`)
        .setTitle(data.title)
        .setImage(data.url)
        .setFooter({ text: `${data.ups || 0} 👍 ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬` } )

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('next')
                    .setLabel('⏩Next Meme')
                    .setStyle('PRIMARY'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('end')
                    .setEmoji('❌')
                    .setStyle('SECONDARY'),
            )
        const msg = await message.reply({ embeds: [Embed], components: [row] });

        const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON', time: 50000 });

        let embed;
        collector.on('collect', async i => {
            i.deferUpdate()
            if (i.user.id === message.author.id) {
                if(i.customId === 'next') {
                    meme(topics).then(async function(again) {
                        embed = new MessageEmbed()
                        .setColor("#36393F")
                        .setURL(`https://www.reddit.com/${again.permalink}`)
                        .setTitle(again.title)
                        .setImage(again.url)
                        .setFooter({ text: `${again.ups || 0} 👍 ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬` })
                        await msg.edit({ embeds: [embed], components: [row] })
                    })
                }
                if(i.customId === 'end') {
                    collector.stop();
                }
            }
        });
        
        collector.on('end',async ccollected => {
            await msg.edit({ embeds: [embed || Embed], components: [] })
        });
        
    });
}
}