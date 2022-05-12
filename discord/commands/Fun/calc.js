const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'calc',
    run: async(client, message, args) => {
        const simplydjs = require("simply-djs")
        simplydjs.calculator(message,{
            embedColor:"YELLOW",
            embedFooter:`${message.author.username}`
        })

    }
}