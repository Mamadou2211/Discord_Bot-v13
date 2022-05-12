const meme = require('random-jokes-api')
module.exports = {
  name: 'joke',
  description: 'A random joke',
  run: async(client, message, args) => {
    const joke = meme.joke()

   message.channel.send(
      {
        content: `${joke}`
      }
    )
  }
}