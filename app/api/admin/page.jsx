"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [lookup, setLookup] = useState("");     // _id or Name
  const [update, setUpdate] = useState({ Value: "", Obtainment: "", Justification: "", "In Game Name": "" });
  const [message, setMessage] = useState("");

  if (status === "loading") return <p className="p-8 text-white">Checking session…</p>;
  if (!session) {
    return (
      <div className="p-8 text-white">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <button className="px-4 py-2 bg-white/10 rounded" onClick={() => signIn("google")}>
          Sign in with Google
        </button>
      </div>
    );
  }
  if (!session.user?.isAdmin) {
    return (
      <div className="p-8 text-white">
        <p>Your account isn’t authorized.</p>
        <button className="px-4 py-2 bg-white/10 rounded mt-4" onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  async function doUpdate() {
    setMessage("Saving...");
    const payload = {
      update: Object.fromEntries(Object.entries(update).filter(([,v]) => v !== "")),
    };
    if (lookup.match(/^[0-9a-fA-F]{24}$/)) payload.id = lookup;
    else payload.name = lookup;

    const res = await fetch("/api/admin/update-unit", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setMessage(res.ok ? `Updated (${data.modifiedCount})` : `Error: ${data.error || "Unknown"}`);
  }

  return (
    <div className="p-8 text-white space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <button className="px-3 py-1 bg-white/10 rounded" onClick={() => signOut()}>Sign out</button>
      </div>

      <div className="grid gap-4 max-w-xl">
        <label className="block">
          <div className="font-semibold mb-1">Lookup (Unit _id or Name)</div>
          <input className="w-full rounded px-3 py-2 bg-white/10"
                 value={lookup} onChange={(e)=>setLookup(e.target.value)} placeholder="e.g. Shiny DBZ Broly" />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <div className="font-semibold mb-1">Value</div>
            <input className="w-full rounded px-3 py-2 bg-white/10"
                   value={update.Value} onChange={(e)=>setUpdate(s=>({...s, Value:e.target.value}))} />
          </label>
          <label className="block">
            <div className="font-semibold mb-1">In Game Name</div>
            <input className="w-full rounded px-3 py-2 bg-white/10"
                   value={update["In Game Name"]} onChange={(e)=>setUpdate(s=>({...s, ["In Game Name"]:e.target.value}))} />
          </label>
          <label className="block md:col-span-2">
            <div className="font-semibold mb-1">Obtainment</div>
            <input className="w-full rounded px-3 py-2 bg-white/10"
                   value={update.Obtainment} onChange={(e)=>setUpdate(s=>({...s, Obtainment:e.target.value}))} />
          </label>
          <label className="block md:col-span-2">
            <div className="font-semibold mb-1">Justification</div>
            <textarea className="w-full rounded px-3 py-2 bg-white/10"
                   value={update.Justification} onChange={(e)=>setUpdate(s=>({...s, Justification:e.target.value}))} />
          </label>
        </div>

        <button className="px-4 py-2 rounded bg-[#efbf04] text-black font-bold" onClick={doUpdate}>
          Save Changes
        </button>

        {message && <div className="text-sm opacity-80">{message}</div>}
      </div>
    </div>
  );
}
