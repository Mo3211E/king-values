import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

// Reuse connection across requests (important for Vercel)
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!uri) {
    throw new Error("Missing MONGODB_URI in environment variables");
  }

  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

// Handle GET /api/units
export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const units = await db.collection("units").find({}).toArray();

    return new Response(JSON.stringify(units), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching units:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch units" }),
      { status: 500 }
    );
  }
}
