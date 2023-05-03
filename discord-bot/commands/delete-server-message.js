const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env.BOT_TOKEN;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
  if (message.content.startsWith("!clear")) {
    const args = message.content.split(" ");
    const amount = parseInt(args[1]) + 1;

    if (isNaN(amount)) {
      message.reply("that doesn't seem to be a valid number.");
    } else if (amount <= 1 || amount > 100) {
      message.reply("you need to input a number between 1 and 99.");
    } else {
      await message.channel.bulkDelete(amount, true);
      message.reply(`deleted ${amount - 1} messages.`);
    }
  }
});

client.login(token);
