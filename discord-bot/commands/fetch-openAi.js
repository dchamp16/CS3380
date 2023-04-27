import { config } from "dotenv";
import axios from "axios";
config();

const apiKey = process.env.OPENAI_KEY;

export async function getOpenAi(question) {
  const apiUrl =
    "https://api.openai.com/v1/engines/text-davinci-002/completions";
  const maxTokens = 100;
  const temperature = 0.7;
  try {
    const response = await axios.post(
      apiUrl,
      {
        prompt: question,
        max_tokens: maxTokens,
        temperature: temperature,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error(error.response.data);
  }
}
