const Discord = require("discord.js");
module.exports = {
name: "catsay",
  aliases: ["cs", "cats", "scat"],
    description: "Make The Cat say thing of your choice",
    options: [
        {
            name: "text",
            description: "the text",
            type: "STRING",
            required: true
        }
    ],
  run: async (client, message, args) => {
    const state = "enabled";
    if (state === "disabled") {
      return message.reply("Command has been disabled for now");
    }
    const msg = args.join(" ");
    if (!msg) {
      return message.reply("What you want the cat to say?").then(msg => {
    setTimeout(() => {
    msg.delete();
    }, 3000);
    })
    }
    message.reply({
      files: [
        {
          attachment: `https://cataas.com/cat/cute/says/${msg}`,
          name: "catsay.png",
        },
      ],
    });
  },
};