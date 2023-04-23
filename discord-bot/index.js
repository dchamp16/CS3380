import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";

// turn on dotenv
config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = process.env.BOT_TOKEN; // gets the bot token

client.login(TOKEN);

client.on("ready", () => {
  console.log(`${client.user.tag} has log in `);
});

client.on("messageCreate", (message) => {
  let foo = message.content === "peter" ? true : false;
  console.log(foo);
});
