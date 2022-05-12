const config = require("../../config.json");
const { get } = require("request-promise-native");
const prefix = config.prefix
const colors = config.Colors
const { MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
  name: "mangasearch",
  aliases: ["search-manga", "ms"],
  usages: "<prefix>manga <search>",
  required: true,

  run: async (client, message, args) => {
    try {

      const color = colors.celestialBlue;
      const syntaxError = {
        title: "Syntax Error",
        fields: [
          {
            name: "Usages:",
            value: `${prefix}manga <search>`,
          },
        ],
        color: colors.syntaxError,
      };

      const query = args.join(" ");

      if (!query)
        return message.reply({
          embeds: [syntaxError],
        });

      const option = {
        url: `https://kitsu.io/api/edge/manga?filter[text]-${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
        },
        json: true,
      };

      const res = await get(option).catch(() => {
        return message.reply({
          content: "No results were found!",
        });
      });

      if (!res)
        return message.reply({
          content: "No results were found!",
        });

      const manga = res.data[0];
      if (!manga)
        return message.reply({
          content: "No results were found!",
        });

      const mangaSearch = {
        title: `${manga.attributes.titles.en_jp}`,
        url: `${manga.links.self}`,
        thumbnail: {
          url: manga.attributes.posterImage.original,
        },
        description: manga.attributes.synopsis,
        fields: [
          {
            name: "⏳ Status",
            value: manga.attributes.status,
            inline: true,
          },
          {
            name: "🗂 Type",
            value: manga.type,
            inline: true,
          },
          {
            name: "🗓️ Aired",
            value:
              manga.attributes.startDate && manga.attributes.endDate
                ? manga.attributes.startDate == manga.attributes.endDate
                  ? `**${manga.attributes.startDate}**`
                  : `From **${
                      manga.attributes.startDate
                        ? manga.attributes.startDate
                        : "N/A"
                    }** to **${
                      manga.attributes.endDate
                        ? manga.attributes.endDate
                        : "N/A"
                    }**`
                : `From **${
                    manga.attributes.startDate
                      ? manga.attributes.startDate
                      : "N/A"
                  }** to **${
                    manga.attributes.endDate ? manga.attributes.endDate : "N/A"
                  }**`,
            inline: false,
          },
          {
            name: "📰 Chapters",
            value: `${
              manga.attributes.chapterCount
                ? manga.attributes.chapterCount
                : "N/A"
            }`,
            inline: true,
          },
          {
            name: "📚 Volumes",
            value: `${
              manga.attributes.volumeCount
                ? manga.attributes.volumeCount
                : "N/A"
            }`,
            inline: true,
          },
          {
            name: "⭐ Average Rating",
            value: `${
              manga.attributes.averageRating
                ? manga.attributes.averageRating
                : "N/A"
            }`,
            inline: true,
          },
          {
            name: "🏆 Rank",
            value: `${
              manga.attributes.ratingRank
                ? "**TOP " + manga.attributes.ratingRank + "**"
                : "N/A"
            }`,
            inline: true,
          },
        ],
        color: color,
      };
      const row = new MessageActionRow()
        {row.addComponents(
           new MessageButton()
            .setStyle("LINK")
            .setURL(manga.links.self)
            .setLabel("My Manga List")
          )}

      return message.channel.send({
        embeds: [mangaSearch],
        components: [row]
      });
    } catch (err) {
      console.log(err);
    }
  },
};
