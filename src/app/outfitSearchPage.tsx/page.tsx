"use client";
import { Button } from '../../components/ui/button'

import { useState } from "react";
import { fetchOutfitsFromPrompt } from "@/app/actions/fetchOutfits";
import Image from "next/image";

export default function OutfitSearchPage() {
  const [prompt, setPrompt] = useState("");
  const [outfits, setOutfits] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    setLoading(true);
    const data = await fetchOutfitsFromPrompt(prompt);
    setOutfits(data);
    setLoading(false);
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <input
        className="border p-2 w-full mb-4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="What kind of outfits are you looking for?"
      />
      <Button onClick={handleSearch} className="bg-black text-white px-4 py-2 mb-4">
        Search
      </Button>

      {loading && <p>Loading outfits...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {outfits.map((outfit) => (
          <div key={outfit.id} className="border p-4 rounded">
            <Image src={outfit.imageUrl} alt={outfit.name} width={300} height={300} />
            <h3 className="text-xl font-bold mt-2">{outfit.name}</h3>
            <p className="text-sm">{outfit.description}</p>
            <p className="text-md font-semibold mt-1">{outfit.price}</p>
            <a
              href={outfit.outfitUrl}
              target="_blank"
              className="text-blue-600 underline mt-2 inline-block"
            >
              View on eBay
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
