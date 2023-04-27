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
      newestCase.forEach((data) => console.log(data));
      // return `Country: ${country} / State: ${state} total: ${newestCase[1]} New Case: ${newestCase[1]}`;
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
}

let covidStat = await getCovidData("usa", "utah");
console.log(covidStat);
