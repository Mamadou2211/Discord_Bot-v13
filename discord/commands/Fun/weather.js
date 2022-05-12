const { Message, Client, MessageEmbed } = require("discord.js");
const weather = require("weather-js")
module.exports = {
    name: "weather",
    aliases: ["weather"],
    description: 'weather info',
    run: async (client, message, args) => {
let city = args.join(" ");
    if(!city) {
        return message.channel.send('Please provide some city will you find!').then(msg => {
    setTimeout(() => {
    msg.delete();
    }, 3000);
    })
    }

    weather.find({ search: city, degreeType: "C" }, function (err, result) {

        if (err) return message.channel.send(err);
        if(!args[0]) { return message.channel.send('Please specify a location!').then(msg => {
    setTimeout(() => {
    msg.delete();
    }, 3000);
    })
        }

        if(result === undefined || result.length === 0) { 
          return message.channel.send('**invaild** location!').then(msg => {
    setTimeout(() => {
    msg.delete();
    }, 3000);
    })
                                                        }
        var current = result[0].current;
        var location = result[0].location;

        const weatherembed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`Weather forecast for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setDescription(`**${current.skytext}**`)
        .addField('Timezone', `UTC ${location.timezone}`, true)
        .addField('Degree Type', 'Celsius', true)
        .addField('Temperature', `${current.temperature}˚`, true)
        .addField('Wind', `${current.winddisplay}`, true)
        .addField('Feels Like', `${current.feelslike}˚`, true)
        .addField('Humidity', `${current.humidity}%`, true)
      .setFooter({text: `Requested By ${message.author.username}`})
        message.channel.send({ embeds: [weatherembed] })

        })
    }
}