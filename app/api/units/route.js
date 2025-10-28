import clientPromise from "../../../lib/mongodb";
import unitsData from "../../data/units.json";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("avvalues");
    const collection = db.collection("units");

    // Try pulling from MongoDB
    const units = await collection.find({}).toArray();

    if (!units || units.length === 0) {
      console.warn("⚠️ No units found in MongoDB. Using local fallback.");
      return Response.json(unitsData);
    }

    console.log(`✅ Loaded ${units.length} units from MongoDB`);
    return Response.json(units);
  } catch (err) {
    console.error("❌ Error loading units from DB:", err);
    // Fallback to local file if DB fails
    return Response.json(unitsData);
  }
}
