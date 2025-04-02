"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Sparkles } from "lucide-react"
import Image from "next/image"
import { generateOutfits } from "./actions"


interface Outfit {
  id: string
  name: string
  description: string
  imageUrl: string
}

export default function OutfitRecommender() {
  const [prompt, setPrompt] = useState("")
  const [outfits, setOutfits] = useState<Outfit[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setLoading(true)
    setError("")

    try {
      const generatedOutfits = await generateOutfits(prompt)
      setOutfits(generatedOutfits)
    } catch (err) {
      setError("Failed to generate outfits. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-r from-emerald-100 via-emerald-50 to-rose-50 ">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">AI Outfit Recommender</h1>

        <form onSubmit={handleSubmit} className="mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Describe the style, occasion, or colors you're looking for..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 rounded-xl shadow-md bg-white/60 backdrop-blur-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder:text-gray-500 text-gray-700 transition-all"
            />
            <Button type="submit" disabled={loading || !prompt.trim()} className="md:w-auto w-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full cursor-pointer">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating  🤔...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                  Generate Outfits
                </>
              )}
            </Button>
          </div>
        </form>

        {error && <div className="text-red-500 mb-6 text-center">{error}</div>}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Our AI is crafting perfect outfit recommendations for you...</p>
          </div>
        ) : outfits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outfits.map((outfit) => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>Enter a prompt to get AI-generated outfit recommendations✨.</p>
            <p className="mt-2 text-sm">Try something like "Business casual for summer" or "Cozy winter outfits"</p>
          </div>
        )}
      </div>
    </div>
  )
}

function OutfitCard({ outfit }: { outfit: Outfit }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="aspect-square relative overflow-hidden">
          <Image src={outfit.imageUrl || "/placeholder.svg"} alt={outfit.name} width={100} height={70} className="object-cover w-full h-full" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{outfit.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{outfit.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm">
          Save
        </Button>
        <Button variant="secondary" size="sm">
          Details
        </Button>
      </CardFooter>
    </Card>
  )
}

