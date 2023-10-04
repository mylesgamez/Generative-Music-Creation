import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { prompt } = req.body;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/musenet/completions",
        {
          prompt: prompt,
          // Other necessary parameters like max tokens, temperature, etc.
        },
        {
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
          },
        }
      );

      // Extract the generated music data from the response
      const musicData = response.data.choices[0].music;

      return res.status(200).json({ musicData });
    } catch (error) {
      return res.status(500).json({ error: "Failed to generate music." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed." });
  }
};
