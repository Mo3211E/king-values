import { auth } from "next-auth";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// PATCH /api/admin/update-unit
// body: { id?: "<_id>", name?: "<Name>", update: { Value, Obtainment, Justification, "In Game Name", ... } }
export async function PATCH(req) {
  // ensure only admins (middleware should also block)
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const body = await req.json();
  const { id, name, update } = body || {};
  if ((!id && !name) || !update || typeof update !== "object") {
    return new Response(JSON.stringify({ error: "Bad request" }), { status: 400 });
  }

  const { db: database } = await db();
  const units = database.collection("units");

  const filter = id ? { _id: new ObjectId(id) } : { Name: name };
  const { matchedCount, modifiedCount } = await units.updateOne(filter, { $set: update });

  return new Response(JSON.stringify({ matchedCount, modifiedCount }), { status: 200 });
}
