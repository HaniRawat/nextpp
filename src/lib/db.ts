"use server";
import { neon } from "@neondatabase/serverless";

export async function getDbConnection() {

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined");
    }
    const sql = neon(databaseUrl!);
    return sql;
}