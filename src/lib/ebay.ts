export async function getEbayAccessToken() {
    const clientId = process.env.EBAY_CLIENT_ID!;
    const clientSecret = process.env.EBAY_CLIENT_SECRET!;
  
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  
    const res = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope",
    });
  
    const data = await res.json();
    return data.access_token;
  }
  
  export async function searchEbayProducts(query: string) {
    const token = await getEbayAccessToken();
    const res = await fetch(
      `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&limit=6`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  
    const data = await res.json();
  
    return data.itemSummaries?.map((item: any) => ({
      id: item.itemId,
      name: item.title,
      description: item.shortDescription || "No description",
      imageUrl: item.image?.imageUrl,
      price: item.price?.value ? `$${item.price.value}` : "N/A",
      outfitUrl: item.itemWebUrl,
    })) ?? [];
  }
  