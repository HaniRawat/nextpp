"use server";

import { extractKeywords } from "./extractKeyword";
import { searchEbayProducts } from "@/lib/ebay";

export async function fetchOutfitsFromPrompt(prompt: string) {
  const keywords = await extractKeywords(prompt);
  console.log("Extracted keywords:", keywords);

  const products = await searchEbayProducts(keywords);
  console.log("eBay results:", products);

  return products;
}
