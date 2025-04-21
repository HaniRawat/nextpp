"use server"

import { google } from "@ai-sdk/google";
import { generateText } from "ai";


interface Outfit {
  id: string
  name: string
  description: string
  imageUrl: string
}

export async function generateOutfits(prompt: string): Promise<Outfit[]> {
  try {


    // Generate outfit recommendations using Gemini
    const { text } = await generateText({
      model: google("gemini-1.5-pro",),
      prompt: `Get outfits from amazon based on the following prompt: "${prompt}".
      Return a JSON array where each outfit has:
      - id (a unique string)
      - name (a catchy name for the outfit)
      - description (a brief description of the outfit, style, and when to wear it)
      - outfitUrl (a valid Amazon product URL for the outfit)
      - price (a string representing the price of the outfit, e.g., "$49.99")
      - imageUrl (a valid, high-quality product image URL **directly from the actual Amazon product page**) (must be accessible and end in .jpg or .png if possible)
      
      Dont generate any other text, just the JSON array and just use the data from the amazon product page.
      Ensure that the imageUrl field contains the **correct URL of the product image on Amazon**, not a placeholder or broken link.
      Format the response as a valid JSON array only, with no additional text.`,
    })
    console.log("Gemini text response:", text);


    // Parse the AI response
    const json = text.match(/\[.*\]/s)?.[0] ?? "[]";
    const outfits: Omit<Outfit, "imageUrl">[] = JSON.parse(json)
    console.log("Parsed outfits:", outfits);

    // Add placeholder images for each outfit
    return outfits.map((outfit, index) => ({
      ...outfit,
      
    }))

    // In a real application, we would generate actual outfit images
    // using an image generation AI or fetch from a database
  } catch (error) {
    console.error("Error generating outfits:", error)
    throw new Error("Failed to generate outfit recommendations")
  }
}

