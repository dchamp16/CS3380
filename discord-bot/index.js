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
    switch (interaction.commandName) {
      case "lorem":
        const text = await getLorem();
        interaction.reply({ content: text });
        break;
      case "help":
        const helpText = `/lorem - Gets lorem ipsum paragraph\n/virus - Gets virus
          `;
        interaction.reply({ content: helpText });
        break;
      default:
        console.log("hello");
    }

    console.log(`getLorem() executed ${interaction.commandName}`);
  }
});

async function main() {
  const commands = [
    {
      name: "lorem",
      description: "Get a lorem ipsum",
    },
    {
      name: "help",
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
