"use server";

export async function searchEbayOutfits(query: string, limit = 10, offset = 0) {
  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("eBay credentials are not set in environment variables.");
  }

  // Step 1: Get OAuth token
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const tokenRes = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "https://api.ebay.com/oauth/api_scope",
    }),
  });

  if (!tokenRes.ok) {
    const errorDetails = await tokenRes.text();
    console.error("OAuth token fetch failed:", errorDetails);
    throw new Error("Unable to obtain eBay access token.");
  }

  const { access_token } = await tokenRes.json();

  // Step 2: Search
  const searchParams = new URLSearchParams({
    q: query,
    limit: limit.toString(),
    offset: offset.toString(),
  });

  const endpoint = `https://api.ebay.com/buy/browse/v1/item_summary/search?${searchParams.toString()}`;

  const searchRes = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });

  if (!searchRes.ok) {
    const errorDetails = await searchRes.text();
    console.error("Search failed:", errorDetails);
    console.error("Search URL:", endpoint);
    throw new Error("Failed to search eBay products");
  }

  const data = await searchRes.json();

  const outfits = (data.itemSummaries || []).map((item: any) => ({
    id: item.itemId,
    name: item.title,
    description: item.shortDescription || item.title,
    imageUrl: item.image?.imageUrl || "",
    price: item.price?.value ? `${item.price.currency} ${item.price.value}` : "N/A",
    outfitUrl: item.itemWebUrl,
  }));

  return outfits;
}

// Wrapper for keyword array
export async function searchEbayProducts(keywords: string[] | string) {
  const query = Array.isArray(keywords) ? keywords.join(" ") : keywords;
  if (!query.trim()) throw new Error("Empty query");
  return await searchEbayOutfits(query);
}
