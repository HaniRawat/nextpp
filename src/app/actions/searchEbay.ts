"use server";

export async function searchEbayOutfits(query: string) {
  const appId = process.env.EBAY_APP_ID;
  if (!appId) throw new Error("EBAY_APP_ID not set");

  const endpoint = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&limit=10`;

  const res = await fetch(endpoint, {
    headers: {
      "Authorization": `Bearer ${appId}`, 
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Failed to fetch from eBay");
  }

  const data = await res.json();

  const outfits = (data.itemSummaries || []).map((item: any) => ({
    id: item.itemId,
    name: item.title,
    description: item.shortDescription || item.title,
    imageUrl: item.image?.imageUrl || "",
    price: item.price?.value ? `$${item.price.value}` : "N/A",
    outfitUrl: item.itemWebUrl,
  }));

  return outfits;
}
