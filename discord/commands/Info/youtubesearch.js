const yts = require('yt-search');

module.exports = {
    name: 'youtubesearch',
    aliases: ['ytsearch', 'yts', 'yt', 'ys'],
    description: "Search on YouTube",
    run: async (client, message, args) => {
        if (!args.length) return message.reply('No search query given') //Checks if the user gave any search queries
        const searched = await yts.search(args.join(' ')); //Searches for videos
        message.channel.send(!searched.videos.length ? 'No Results' : searched.videos[0].url)
    //Sends the result
    }
}