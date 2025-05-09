"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { saveOutfit, unsaveOutfit } from "@/app/actions/saveOutfit";
import { useUser } from "@clerk/nextjs";

interface Outfit {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  outfitUrl?: string;
  price?: string;
}

interface Props {
  outfit: Outfit;
  isSavedInitially?: boolean;
}

export default function ProductCard({ outfit, isSavedInitially = false }: Props) {
  const { user } = useUser();
  const [isSaved, setIsSaved] = useState(isSavedInitially);
  const [isPending, startTransition] = useTransition();

  const handleToggleSave = () => {
    if (!user?.id) {
      alert("Please sign in to save outfits.");
      return;
    }

    startTransition(async () => {
      if (isSaved) {
        await unsaveOutfit(outfit.id, user.id);
        setIsSaved(false);
      } else {
        await saveOutfit({ ...outfit, userId: user.id });
        setIsSaved(true);
      }
    });
  };

  return (
    <div className="border rounded-xl shadow-md p-4 flex flex-col gap-3 hover:shadow-lg transition duration-300">
      <a href={outfit.outfitUrl} target="_blank" rel="noopener noreferrer">
        <Image
          src={outfit.imageUrl}
          alt={outfit.name}
          width={300}
          height={300}
          className="w-full h-64 object-cover rounded-lg"
        />
      </a>

      <div>
        <h2 className="text-lg font-semibold line-clamp-1">{outfit.name}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{outfit.description}</p>
        {outfit.price && <p className="mt-1 font-medium text-green-600">{outfit.price}</p>}
      </div>

      <button
        onClick={handleToggleSave}
        disabled={isPending}
        className={`mt-auto px-4 py-2 rounded text-white ${
          isSaved ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isPending ? "Please wait..." : isSaved ? "Unsave" : "Save"}
      </button>
    </div>
  );
}
