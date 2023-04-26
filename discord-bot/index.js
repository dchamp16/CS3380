import { Client, GatewayIntentBits, Routes } from "discord.js";
import { config } from "dotenv";
import { REST } from "@discordjs/rest";
import { getLorem } from "./commands/fetch-lorem.js";
import { getCovidData } from "./commands/fetch-covid.js";
import { getDadJoke } from "./commands/fetch-dad-joke.js";

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
        let paragraphCount = interaction.options.data[0]["value"];
        const text = await getLorem(paragraphCount);
        interaction.reply({ content: text });
        console.log("lorem() initiate");
        break;
      case "covid":
        let covidCountry = interaction.options.data[0]["value"];
        let covidState = interaction.options.data[1]["value"];
        let covidStat = await getCovidData(covidCountry, covidState);
        interaction.reply({ content: covidStat });
        console.log("covid() initiate");
        break;
      case "dad_joke":
        let jokes = await getDadJoke();
        interaction.reply({ content: `${jokes[0]["joke"]} :joy:` });
        break;
      case "help":
        const helpText = `/lorem <count of lines> - Gets lorem ipsum paragraph\n/virus <country> <state> - Gets virus
      `;

        interaction.reply({ content: helpText });
        break;
      default:
        console.log("hello");
    }
  }
});

async function main() {
  const commands = [
    {
      name: "lorem",
      description: "filler paragraph lets gooo",
      options: [
        {
          name: "line_count",
          description: "Number of lines",
          type: 4,
          required: true,
        },
      ],
    },
    {
      name: "help",
      description: "Help Tutorial",
    },
    {
      name: "covid",
      description: "Number of new cases country and county",
      options: [
        {
          name: "country",
          description: "Name of the county",
          type: 3,
          required: true,
        },
        {
          name: "state",
          description: "Name of the state",
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: "dad_joke",
      description: "There is no too funny than dads jokes",
    },
    {
      //TODO
      name: "currency_converter",
      description: "money talks",
    },
    {
      //TODO
      name: "ip_lookup",
      description: "lets geekout lets check an ip address",
    },
    {
      //TODO
      name: "dictionary",
      description: "let me look up a word for you",
    },
    {
      //TODO
      name: "weather",
      description: "rain or shine im here for you",
    },
    {
      //TODO
      name: "air_quality",
      description: "i cant breathh!!",
    },
    {
      //TODO
      name: "youtube",
      description: "are you bored? lets watch",
    },
    {
      //TODO
      name: "die",
      description: "please no!! pleaseee!!",
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
