import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import leoProfanity from "leo-profanity";

// --- Profanity filter setup ---
leoProfanity.add(leoProfanity.getDictionary("en"));
function filterCensoredWords(text, bannedWords) {
  if (!text) return text;

  // Apply automatic profanity filter first
  let filtered = leoProfanity.clean(text);

  // Apply custom banned words from MongoDB
  for (const word of bannedWords) {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    filtered = filtered.replace(regex, "***");
  }
  return filtered;
}

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("avvalues");
    const trades = db.collection("trades");

    const { search } = Object.fromEntries(req.nextUrl.searchParams);
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const results = await trades
      .find(query)
      .sort({ createdAt: -1 })
      .limit(200)
      .toArray();

    return NextResponse.json({ success: true, results });
  } catch (err) {
    console.error("Fetch trades error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("avvalues");
    const trades = db.collection("trades");
    const censored = db.collection("censored_words");

   const {
  title,
  description,
  player1,
  player2,
  p1Total,
  p2Total,
  verdict,
  discord,
  roblox,
} = await req.json();


    if (!title || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Load banned words from MongoDB
    const banned = await censored.find({}).toArray();
    const bannedWords = banned.map((w) => w.word.toLowerCase());

    // Apply filters
    const safeTitle = filterCensoredWords(title, bannedWords);
    const safeDescription = filterCensoredWords(description, bannedWords);

    // Create trade document
const newTrade = {
  title: safeTitle,
  description: safeDescription,
  player1,
  player2,
  p1Total,
  p2Total,
  verdict,
  discord,
  roblox,
  createdAt: new Date(),
};


    // Save to MongoDB
    await trades.insertOne(newTrade);

    return NextResponse.json({ success: true, trade: newTrade });
  } catch (err) {
    console.error("Post trade error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const key = req.headers.get("x-admin-key");
    if (key !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const client = await clientPromise;
    const db = client.db("avvalues");
    const trades = db.collection("trades");

    const result = await trades.deleteMany({});
    return NextResponse.json({
      success: true,
      message: `Deleted ${result.deletedCount} trades.`,
    });
  } catch (err) {
    console.error("Clear trades error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
