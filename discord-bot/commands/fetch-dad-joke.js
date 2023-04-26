import fetch from "node-fetch";
import { config } from "dotenv";

config();

export async function getDadJoke() {
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/dadjokes?limit=1`,
      {
        headers: {
          "X-Api-Key": process.env.NINJA_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const body = await response.text();
    return JSON.parse(body);
  } catch (error) {
    console.error("Request failed:", error);
  }
}
