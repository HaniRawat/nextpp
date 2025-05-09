"use server";

import { extractKeywords } from "./extractKeyword";
import { searchEbayProducts } from "@/lib/ebay";

export async function fetchOutfitsFromPrompt(prompt: string) {
  const keywords = await extractKeywords(prompt);
  const products = await searchEbayProducts(keywords);
  return products;
}
