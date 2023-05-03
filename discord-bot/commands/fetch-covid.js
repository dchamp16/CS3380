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
    if (response.status !== 200) {
      console.error("Error:", response.status, response.statusText);
    } else {
      const body = await response.text();
      let newestCase = JSON.parse(body);
      let values = Object.values(newestCase[0]["cases"]);
      const lastvalue = values[values.length - 1];
      return lastvalue;
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
}