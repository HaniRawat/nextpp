"use server";

const EBAY_OAUTH_URL = "https://api.ebay.com/identity/v1/oauth2/token"; // Use sandbox URL if needed
const EBAY_API_SCOPE = "https://api.ebay.com/oauth/api_scope";

async function getEbayAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(EBAY_OAUTH_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: EBAY_API_SCOPE,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("❌ eBay Auth Error Response:", errorBody);
    throw new Error("Failed to authenticate with eBay");
  }

  const data = await response.json();
  return data.access_token;
}

export async function searchEbayProducts(query: string, limit = 10, offset = 0) {
  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("❌ eBay credentials are missing in environment variables.");
  }

  try {
    const accessToken = await getEbayAccessToken(clientId, clientSecret);

    const searchParams = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      offset: offset.toString(),
    });

    const searchUrl = `https://api.ebay.com/buy/browse/v1/item_summary/search?${searchParams.toString()}`;

    const response = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("❌ eBay Product Search Error:", errorBody);
      throw new Error("Failed to search eBay products");
    }

    const data = await response.json();

    const products = (data.itemSummaries || []).map((item: any) => ({
      id: item.itemId,
      name: item.title,
      description: item.shortDescription || item.title,
      imageUrl: item.image?.imageUrl || "",
      price: item.price?.value ? `${item.price.currency} ${item.price.value}` : "N/A",
      outfitUrl: item.itemWebUrl,
    }));

    return products;
  } catch (error) {
    console.error("Failed to search eBay products:", error);
    throw new Error("Failed to search eBay products");
  }
}
