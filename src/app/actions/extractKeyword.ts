"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function extractKeywords(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const result = await model.generateContent(`
    Extract the main keywords or short search phrases from this fashion prompt: "${prompt}".
    Return a comma-separated string of the most relevant keywords, e.g., "linen blazer, summer business outfit"
  `);

  const text = result.response.text();
  return text.replace(/\n/g, "").trim();
}
