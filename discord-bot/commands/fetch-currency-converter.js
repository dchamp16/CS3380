import fetch from "node-fetch";
import { config } from "dotenv";

config();

export async function getConvertCurrency(from, to, price) {
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/convertcurrency?want=${to}&have=${from}&amount=${price}`,
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
      return JSON.parse(body);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
}
