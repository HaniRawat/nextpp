"use server";

import { getDbConnection } from "@/lib/db";

// Save outfit
export async function saveOutfit({
  id,
  name,
  description,
  imageUrl,
  price,
  userId,
}: {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price?: string;
  userId: string;
}) {
  const sql = await getDbConnection();

  await sql`
    INSERT INTO saved_outfits (user_id, outfit_id, name, description, image_url, price)
    VALUES (${userId}, ${id}, ${name}, ${description}, ${imageUrl}, ${price})
    ON CONFLICT (user_id, outfit_id) DO NOTHING;
  `;
}

// Unsave outfit
export async function unsaveOutfit(outfitId: string, userId: string) {
  const sql = await getDbConnection();

  await sql`
    DELETE FROM saved_outfits
    WHERE user_id = ${userId} AND outfit_id = ${outfitId};
  `;
}

// Fetch saved outfits for a user
export async function getSavedOutfits(userId: string) {
  const sql = await getDbConnection();

  const rows = await sql`
    SELECT outfit_id as id, name, description, image_url as imageUrl, price
    FROM saved_outfits
    WHERE user_id = ${userId}
    ORDER BY created_at DESC;
  `;

  return rows;
}

// Check if a single outfit is saved (optional helper)
export async function isOutfitSaved(userId: string, outfitId: string) {
  const sql = await getDbConnection();

  const result = await sql`
    SELECT 1 FROM saved_outfits WHERE user_id = ${userId} AND outfit_id = ${outfitId};
  `;

  return result.length > 0;
}
