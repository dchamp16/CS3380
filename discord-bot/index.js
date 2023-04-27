import { Client, GatewayIntentBits, Routes } from "discord.js";
import { config } from "dotenv";
import { REST } from "@discordjs/rest";
/* COMMANDS */
import { getLorem } from "./commands/fetch-lorem.js";
import { getCovidData } from "./commands/fetch-covid.js";
import { getDadJoke } from "./commands/fetch-dad-joke.js";
import { getDictionary } from "./commands/fetch-dictionary.js";
import { getConvertCurrency } from "./commands/fetch-currency-converter.js";
import { getIpLookUp } from "./commands/fetch-ip-lookup.js";
import { getWeather } from "./commands/fetch-weather.js";
import { getTimezone } from "./commands/fetch-timezone.js";
import { getHelp } from "./commands/help.js";

// turn on dotenv
config();
const now = new Date();
const hour = now.getHours();
const minute = now.getMinutes();
const second = now.getSeconds();
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

client.on("ready", () => console.log(`${client.user.tag} LOGIN `));

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    switch (interaction.commandName) {
      case "lorem":
        let paragraphCount = interaction.options.data[0]["value"];
        const text = await getLorem(paragraphCount);
        interaction.reply({ content: text });
        console.log("lorem initiate");
        break;
      case "covid":
        let covidCountry = interaction.options.data[0]["value"];
        let covidState = interaction.options.data[1]["value"];
        let covidStat = await getCovidData(covidCountry, covidState);
        interaction.reply({ content: covidStat });
        console.log("covid initiate");
        break;
      case "dad_joke":
        let jokes = await getDadJoke();
        interaction.reply({ content: `${jokes[0]["joke"]} :joy:` });
        console.log("dad_joke initiated");
        break;
      case "die":
        let secret = interaction.options.data[0]["value"];
        if (secret === "jramos") {
          interaction.reply({ content: `:face_holding_back_tears:` });
          client.destroy();
        } else {
          interaction.reply({ content: `:stuck_out_tongue_closed_eyes:` });
        }
        console.log("die initiate");
        break;
      case "dictionary":
        let word = interaction.options.data[0]["value"];
        let definition = await getDictionary(word);
        interaction.reply({ content: definition["definition"] });
        console.log(`dictionary initialize`);
        break;
      case "currency_converter":
        let fromCurreny = interaction.options.data[0]["value"];
        let toCurrency = interaction.options.data[1]["value"];
        let amount = interaction.options.data[2]["value"];
        let changeApi = await getConvertCurrency(
          fromCurreny,
          toCurrency,
          amount
        );
        let change = `${changeApi["old_currency"]}: ${changeApi["old_amount"]} = ${changeApi["new_currency"]}: ${changeApi["new_amount"]}`;
        interaction.reply({ content: change });
        console.log(`currency_converter initialize`);
        break;
      case "ip_lookup":
        let ipAdd = interaction.options.data[0]["value"];
        const ipStat = await getIpLookUp(ipAdd);
        const locate = `IP located | Provider (${ipStat["isp"]}) ${ipStat["country"]} ${ipStat["region"]} ${ipStat["city"]}`;
        interaction.reply({ content: locate });
        console.log(`ip_lookup initialize`);
        break;
      case "weather":
        let cityW = interaction.options.data[0]["value"];
        const cityWeather = await getWeather(cityW);
        const sunrise = new Date(cityWeather["sunrise"] * 1000);
        const sunset = new Date(cityWeather["sunset"] * 1000);
        const cityCondition = `${city}: ${cityWeather["temp"]} Celsius\nHumidity: ${cityWeather["humidity"]}%\nSunrise: ${sunrise}\nSunset: ${sunset}`;
        interaction.reply({ content: cityCondition });
        console.log(`weather initialize`);
        break;
      case "timezone":
        let cityT = interaction.options.data[0]["value"];
        const cityTimezone = await getTimezone(cityT);
        const cityTimeInfo = `${cityT}: ${cityTimezone["timezone"]} ${cityTimezone["datetime"]} ${cityTimezone["day_of_week"]}`;
        interaction.reply({ content: cityTimeInfo });
        break;
      case "help":
        // still need to add more
        interaction.reply({ content: getHelp() });
        break;
      default:
        console.log("hello");
        break;
    }
  }
});

async function main() {
  const commands = [
    {
      name: "lorem",
      description: "Filler paragraph lets gooo",
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
      name: "currency_converter",
      description: "money talks",
      options: [
        {
          name: "from",
          description: "Name of the county",
          type: 3,
          required: true,
        },
        {
          name: "to",
          description: "Name of the state",
          type: 3,
          required: true,
        },
        {
          name: "amount",
          description: "How much you are exchanging",
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: "ip_lookup",
      description: "Lets geekout lets check an ip address",
      options: [
        {
          name: "ip",
          description: "Locate ip address and provider",
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: "dictionary",
      description: "Let me look up a word for you",
      options: [
        {
          name: "define",
          description: "Give me a word",
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: "weather",
      description: "Rain or Shine im here for you",
      options: [
        {
          name: "city",
          description: "Get the cities weather",
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: "timezone",
      description: "What time is it there?",
      options: [
        {
          name: "city",
          description: "Get the cities timezone",
          type: 3,
          required: true,
        },
      ],
    },
    {
      //TODO
      name: "youtube",
      description: "Are you bored? lets watch",
    },
    {
      name: "die",
      description: "Please no!! pleaseee!!",
      options: [
        {
          name: "secret_word",
          description: "You hate? catch me you can!!",
          type: 3,
          required: true,
        },
      ],
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
