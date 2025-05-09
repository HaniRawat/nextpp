"use server";

export async function searchEbayOutfits(query: string) {
  const clientId = process.env.EBAY_CLIENT_ID!;
  const clientSecret = process.env.EBAY_CLIENT_SECRET!;
  if (!clientId || !clientSecret) throw new Error("eBay credentials not set");

  // Step 1: Get OAuth token
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const tokenRes = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope"
  });

  if (!tokenRes.ok) {
    const errorText = await tokenRes.text();
    console.error("Token fetch failed:", errorText);
    throw new Error("Failed to get eBay access token");
  }

  const { access_token } = await tokenRes.json();

  // Step 2: Search eBay
  const endpoint = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&limit=10`;

  const res = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
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
