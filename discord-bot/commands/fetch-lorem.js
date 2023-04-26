import { config } from "dotenv";
import fetch from "node-fetch";
config();

// need a NINJA_API_KEY in .env
export async function getLorem(count) {
  try {
    const response = await fetch(
      "https://api.api-ninjas.com/v1/loremipsum?paragraphs=" + count,
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
      return JSON.parse(body)["text"];
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
}

// getLorem(4).then((data) => console.log(data));
