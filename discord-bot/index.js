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
        let city = interaction.options.data[0]["value"];
        const citiesWeather = await getWeather(city);
        const sunrise = new Date(citiesWeather["sunrise"] * 1000);
        const sunset = new Date(citiesWeather["sunset"] * 1000);
        const cityCondition = `${city}: ${citiesWeather["temp"]} Celsius\nHumidity: ${citiesWeather["humidity"]}%\nSunrise: ${sunrise}\nSunset: ${sunset}`;
        interaction.reply({ content: cityCondition });
        console.log(`weather initialize`);
        break;
      case "help":
        // still need to add more
        const helpText = `/lorem <COUNT OF LINES> - Gets lorem ipsum paragraph\n/covid <COUNTRY> <STATE> - Gets covid cases\n/dad_joke Gives you a dads jokes\n/die <SECRET WORD> Logouts the bot but you need the secret word\n/dictionary <WORD> Gives the definition of the word\n/currency_converter <FROM CURRENCY><TO CURRENCY><AMOUNT> Convert your money\n/ip_lookup <IP ADDRESS> Gives the location and IPS\n/weather <city> Gets the tempreture, humidity, sunrise and sunset
      `;
        interaction.reply({ content: helpText });
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
          description: "how much you are exchanging",
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: "ip_lookup",
      description: "lets geekout lets check an ip address",
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
      description: "let me look up a word for you",
      options: [
        {
          name: "define",
          description: "give me a word",
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: "weather",
      description: "rain or shine im here for you",
      options: [
        {
          name: "city",
          description: "get the cities weather",
          type: 3,
          required: true,
        },
      ],
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
      name: "die",
      description: "please no!! pleaseee!!",
      options: [
        {
          name: "secret_word",
          description: "you hate? catch me you can!!",
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
