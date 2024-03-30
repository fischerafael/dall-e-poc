import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const prompt = req.body.prompt;
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    const url = response.data[0].url;
    return res.status(200).json({ url });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}
