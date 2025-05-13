"use server";

import { extractKeywords } from "./extractKeyword";
import { searchEbayProducts } from "@/lib/ebay";

export async function fetchOutfitsFromPrompt(prompt: string) {
  const keywords = await extractKeywords(prompt);
  console.log("Extracted keywords:", keywords);
  console.log("eBay ID:", process.env.EBAY_CLIENT_ID);
  console.log("eBay Secret:", process.env.EBAY_CLIENT_SECRET);

  const products = await searchEbayProducts(keywords);
  console.log("eBay results:", products);

  return products;
}
