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
      prompt: `Generate 6 outfit recommendations based on the following prompt: "${prompt}".
      Return a JSON array where each outfit has:
      - id (a unique string)
      - name (a catchy name for the outfit)
      - description (a brief description of the outfit, style, and when to wear it)
      
      Format the response as a valid JSON array only, with no additional text.`,
    })
    console.log("Gemini text response:", text);


    // Parse the AI response
    const json = text.match(/\[.*\]/s)?.[0] ?? "[]";
    const outfits: Omit<Outfit, "imageUrl">[] = JSON.parse(json)

    // Add placeholder images for each outfit
    return outfits.map((outfit, index) => ({
      ...outfit,
      imageUrl: `/placeholder.svg?height=400&width=400&text=Outfit+${index + 1}`,
    }))

    // In a real application, you would generate actual outfit images
    // using an image generation AI or fetch from a database
  } catch (error) {
    console.error("Error generating outfits:", error)
    throw new Error("Failed to generate outfit recommendations")
  }
}

