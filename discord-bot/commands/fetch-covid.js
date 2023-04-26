import { config } from "dotenv";
import fetch from "node-fetch";

config();

export async function getCovidData(country, state) {
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/covid19?country=${country}&region=${state}`,
      {
        headers: {
          "X-Api-Key": process.env.NINJA_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    const newestCase = Object.entries(data[0]["cases"]).pop();
    return `Country: ${country} / State: ${state} total: ${newestCase[1]["total"]} New Case: ${newestCase[1]["new"]}`;
  } catch (error) {
    console.error(`Request failed: ${error.message}`);
  }
}
