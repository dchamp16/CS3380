import { Client, GatewayIntentBits, Routes } from "discord.js";
import { config } from "dotenv";
import { REST } from "@discordjs/rest";
import { getLorem } from "./commands/fetch-lorem.js";

// turn on dotenv
config();
const BOTTOKEN = process.env.BOT_TOKEN; // gets the bot token
const CLIENTID = process.env.CLIENT_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: "10" }).setToken(BOTTOKEN);

client.on("ready", () => console.log(`${client.user.tag} has log in `));

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const text = await getLorem();
    interaction.reply({ content: text });
    console.log(`getLorem() executed ${interaction.commandName}`);
    let name = interaction;
    console.log(name);
  }
});

async function main() {
  const commands = [
    {
      name: "order",
      description: "Order soemthing...",
    },
    {
      name: "tutorialhelp2",
      description: "Help Tutorial",
    },
    {
      name: "tutorialhelp3",
      description: "Help Tutorial",
    },
  ];
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(CLIENTID), { body: commands });
    client.login(BOTTOKEN);
  } catch (err) {
    console.log(err.message);
  }
}
main();
