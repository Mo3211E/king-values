import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb.js";

/* ----------------------- SETTINGS ----------------------- */
// Optional admin key for secure access (set in .env.local)
const ADMIN_KEY = process.env.ADMIN_KEY || "default-key";

// Hard rate limit per user/IP (to stop spam)
const MAX_TRADES_PER_MINUTE = 5;

// Database and collection names
const DB_NAME = "avvalues";
const COLLECTION = "trades";

/* ----------------------- GET ----------------------- */
export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const trades = db.collection(COLLECTION);

    const { search } = Object.fromEntries(req.nextUrl.searchParams);
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // Lightweight projection for performance
    const projection = {
      title: 1,
      description: 1,
      verdict: 1,
      p1Total: 1,
      p2Total: 1,
      discord: 1,
      roblox: 1,
      createdAt: 1,
    };

    const results = await trades
      .find(query, { projection })
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({ success: true, results });
  } catch (err) {
    console.error("GET /api/trades error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/* ----------------------- POST ----------------------- */
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const trades = db.collection(COLLECTION);

    // Optional admin key check for security
    const key = req.headers.get("x-admin-key");
    if (ADMIN_KEY && key !== ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, player1, player2, discord, roblox } = body;

    // 🧱 Validate required fields
    if (
      (!title || typeof title !== "string" || title.trim().length < 3) &&
      (!player1?.length || !player2?.length)
    ) {
      return NextResponse.json(
        { error: "Invalid trade. Title or valid players required." },
        { status: 400 }
      );
    }

    // 🧱 Enforce rate limit by IP
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const rateKey = `rate:${ip}`;
    const rateCollection = db.collection("rate_limits");

    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const cutoff = now - windowMs;

    // Remove expired rate limit entries
    await rateCollection.deleteMany({ ip, timestamp: { $lt: cutoff } });

    const recentPosts = await rateCollection.countDocuments({ ip });
    if (recentPosts >= MAX_TRADES_PER_MINUTE) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Try again in a minute." },
        { status: 429 }
      );
    }

    // Record this post
    await rateCollection.insertOne({ ip, timestamp: now });

    // 🧱 Check for duplicates (title + description)
    const duplicate = await trades.findOne({ title, description });
    if (duplicate) {
      return NextResponse.json(
        { error: "Duplicate trade already exists." },
        { status: 409 }
      );
    }

    // 🧱 Insert trade
    const result = await trades.insertOne({
      title: title.trim(),
      description: description?.trim() || "",
      player1: player1 || [],
      player2: player2 || [],
      discord: discord?.trim() || "",
      roblox: roblox?.trim() || "",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (err) {
    console.error("POST /api/trades error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/* ----------------------- DELETE ----------------------- */
export async function DELETE(req) {
  try {
    const key = req.headers.get("x-admin-key");
    if (ADMIN_KEY && key !== ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const trades = db.collection(COLLECTION);

    const result = await trades.deleteMany({});
    return NextResponse.json({
      success: true,
      deleted: result.deletedCount,
    });
  } catch (err) {
    console.error("DELETE /api/trades error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
