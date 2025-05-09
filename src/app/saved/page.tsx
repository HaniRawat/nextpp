import { currentUser } from "@clerk/nextjs/server";
import { getSavedOutfits } from "../actions/saveOutfit";
import ProductCard from "@/components/ui/productCard";

export default async function SavedPage() {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold text-lg">
        Please sign in to view your saved outfits.
      </div>
    );
  }

  const savedOutfits = await getSavedOutfits(user.id);

  if (!savedOutfits.length) {
    return (
      <div className="p-8 text-center text-gray-600 text-lg">
        You haven’t saved any outfits yet.
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {savedOutfits.map((outfit) => (
        <ProductCard key={outfit.id} outfit={outfit} isSavedInitially={true} />
      ))}
    </div>
  );
}
