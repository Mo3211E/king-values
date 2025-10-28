"use client";
import { useState, useMemo, useEffect } from "react";
import TradeBox from "../components/TradeBox";
import GalaxyBackground from "../components/GalaxyBackground";
import CompactUnitCard from "../components/CompactUnitCard";

function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export default function TradeHub() {
  const [ads, setAds] = useState([]);
  const [description, setDescription] = useState("");
  const [player1, setPlayer1] = useState([]);
  const [player2, setPlayer2] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const p1Total = useMemo(
    () => player1.reduce((s, u) => s + toNumber(u.Value), 0),
    [player1]
  );
  const p2Total = useMemo(
    () => player2.reduce((s, u) => s + toNumber(u.Value), 0),
    [player2]
  );

  const verdict = useMemo(() => {
    if (p1Total === p2Total) return "Fair Trade";
    if (p1Total < p2Total) return "Win for Advertiser";
    return "Loss for Advertiser";
  }, [p1Total, p2Total]);

  // Auto-generate trade title
  const generatedTitle = useMemo(() => {
    const you = player1.map((u) => u.Name).join(", ");
    const them = player2.map((u) => u.Name).join(", ");
    if (!you && !them) return "";
    return `${you || "?"} for ${them || "?"}`;
  }, [player1, player2]);

  // Load trades
  async function loadTrades(query = "") {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/trades${query ? `?search=${encodeURIComponent(query)}` : ""}`
      );
      const data = await res.json();
      if (data.success) setAds(data.results);
    } catch (err) {
      console.error("Failed to load trades:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTrades(search);
  }, [search]);

  // Post new trade
  const postTrade = async () => {
    if (!player1.length && !player2.length)
      return alert("Please add units to your trade.");

    const newAd = {
      title: generatedTitle,
      description,
      player1,
      player2,
      p1Total,
      p2Total,
      verdict,
    };

    try {
      const res = await fetch("/api/trades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAd),
      });

      const data = await res.json();
      if (data.success) {
        setAds([data.trade, ...ads]);
        setDescription("");
        setPlayer1([]);
        setPlayer2([]);
      } else {
        alert(data.error || "Error posting trade");
      }
    } catch (err) {
      console.error("Post trade failed:", err);
    }
  };

  const filteredAds = ads.filter((ad) => {
    const query = search.toLowerCase();
    return (
      ad.title.toLowerCase().includes(query) ||
      ad.description.toLowerCase().includes(query) ||
      ad.player1.some((u) => u.Name.toLowerCase().includes(query)) ||
      ad.player2.some((u) => u.Name.toLowerCase().includes(query))
    );
  });

  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      <GalaxyBackground />

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <h1
           className="font-extrabold text-[2.3rem] sm:text-[2.8rem] md:text-[3.2rem] leading-tight mb-10 bg-clip-text text-transparent text-center mx-auto w-fit"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #c6a4ff, #f3b5ff, #b9b4ff, #c6a4ff)",
            backgroundSize: "300% 300%",
            animation: "titleGradient 12s ease-in-out infinite",
            textShadow:
              "0 0 40px rgba(198,164,255,0.35), 0 0 70px rgba(243,181,255,0.25)",
          }}
        >
          Trade Hub
        </h1>

        {/* Trade Boxes */}
        <div className="flex flex-col md:flex-row items-start md:items-stretch justify-center gap-8 mb-8">
          <TradeBox title="Your Offer" units={player1} setUnits={setPlayer1} />
          <TradeBox title="Their Offer" units={player2} setUnits={setPlayer2} />
        </div>

        {/* Verdict Display */}
        <div className="flex items-center justify-center gap-8 mb-6 text-center">
          <div className="text-2xl md:text-3xl font-extrabold w-1/3 text-right">
            You
          </div>
          <div className="w-1/3 text-center">
            <h2
              className={`text-2xl sm:text-3xl font-extrabold ${
                p1Total === p2Total
                  ? "text-gray-300"
                  : p1Total < p2Total
                  ? "text-emerald-400"
                  : "text-red-500"
              }`}
              style={{
                textShadow:
                  p1Total === p2Total
                    ? "0 0 12px rgba(200,150,255,0.5)"
                    : p1Total < p2Total
                    ? "0 0 15px rgba(0,255,180,0.6)"
                    : "0 0 15px rgba(255,100,100,0.6)",
              }}
            >
              {p1Total === p2Total
                ? `Fair (0)`
                : p1Total < p2Total
                ? `Win (${(p2Total - p1Total).toLocaleString()})`
                : `Loss (${(p1Total - p2Total).toLocaleString()})`}
            </h2>
          </div>
          <div className="text-2xl md:text-3xl font-extrabold w-1/3 text-left">
            Other Player
          </div>
        </div>

        {/* Trade Preview */}
        {(player1.length > 0 || player2.length > 0) && (
          <div
            className="rounded-2xl p-6 mb-10 shadow-xl border"
            style={{
              background:
                "linear-gradient(180deg, rgba(20,0,40,0.65), rgba(0,0,0,0.85))",
              borderColor: "rgba(180,150,255,0.25)",
              boxShadow:
                "0 0 18px rgba(200,170,255,0.15), inset 0 0 8px rgba(160,120,255,0.12)",
            }}
          >
            <h3 className="text-xl font-bold mb-3 text-violet-200">
              {generatedTitle || "Pending..."}
            </h3>
            <div className="flex flex-col md:flex-row gap-6 mb-4">
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-pink-300">Your Offer</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 justify-center">
                  {player1.map((u, idx) => (
                    <CompactUnitCard key={idx} u={u} clickable={true} />
                  ))}
                </div>
                <p className="mt-1 text-white/80">
                  Total: {p1Total.toLocaleString()}
                </p>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-blue-300">
                  Their Offer
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 justify-center">
                  {player2.map((u, idx) => (
                    <CompactUnitCard key={idx} u={u} clickable={true} />
                  ))}
                </div>
                <p className="mt-1 text-white/80">
                  Total: {p2Total.toLocaleString()}
                </p>
              </div>
            </div>
            <p className="font-bold text-violet-300">{verdict}</p>
          </div>
        )}

        {/* Post Trade Section */}
        <div
          className="rounded-2xl p-6 mb-12 shadow-2xl border"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,0,40,0.65) 0%, rgba(3,0,15,0.8) 60%, rgba(0,0,0,0.85) 100%)",
            borderColor: "rgba(180,150,255,0.25)",
            boxShadow:
              "0 0 24px rgba(200,170,255,0.15), inset 0 0 8px rgba(160,120,255,0.12)",
            backdropFilter: "blur(6px)",
          }}
        >
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a note or description..."
            rows="3"
            className="w-full px-3 py-2 rounded-lg mb-3 outline-none text-white placeholder-white/60"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(190,160,255,0.35)",
              boxShadow: "inset 0 0 8px rgba(160,120,255,0.12)",
            }}
          />
          <button
            onClick={postTrade}
            className="w-full sm:w-auto px-8 py-2 rounded-lg font-bold transition"
            style={{
              background:
                "linear-gradient(90deg, rgba(150,90,255,0.5), rgba(230,150,255,0.45))",
              border: "1px solid rgba(190,160,255,0.35)",
              boxShadow:
                "0 0 14px rgba(180,120,255,0.3), inset 0 0 8px rgba(180,120,255,0.2)",
            }}
          >
            Post Trade
          </button>
        </div>

        {/* Search Bar */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search trades..."
          className="w-full px-3 py-2 rounded-lg mb-10 outline-none text-white placeholder-white/60"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(190,160,255,0.35)",
            boxShadow: "inset 0 0 8px rgba(160,120,255,0.12)",
          }}
        />

        {loading && (
          <p className="text-center text-violet-300 mb-4">Loading trades...</p>
        )}

        {/* Posted Trades */}
        <div className="space-y-8">
          {filteredAds.map((ad, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 shadow-xl border"
              style={{
                background:
                  "linear-gradient(180deg, rgba(20,0,40,0.65), rgba(0,0,0,0.85))",
                borderColor: "rgba(180,150,255,0.25)",
                boxShadow:
                  "0 0 18px rgba(200,170,255,0.15), inset 0 0 8px rgba(160,120,255,0.12)",
              }}
            >
              <h3 className="text-xl font-bold mb-2 text-violet-200">
                {ad.title}
              </h3>
              {ad.description && (
                <p className="mb-4 text-white/85">{ad.description}</p>
              )}

              <div className="flex flex-col md:flex-row gap-6 mb-4">
                <div className="flex-1">
                  <h4 className="font-semibold mb-2 text-pink-300">
                    Your Offer
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 justify-center">
                    {ad.player1.map((u, idx) => (
                      <CompactUnitCard key={idx} u={u} clickable={true} />
                    ))}
                  </div>
                  <p className="mt-1 text-white/80">
                    Total: {ad.p1Total.toLocaleString()}
                  </p>
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold mb-2 text-blue-300">
                    Their Offer
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 justify-center">
                    {ad.player2.map((u, idx) => (
                      <CompactUnitCard key={idx} u={u} clickable={true} />
                    ))}
                  </div>
                  <p className="mt-1 text-white/80">
                    Total: {ad.p2Total.toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="font-bold text-violet-300">{ad.verdict}</p>
              <p className="text-xs text-white/50 mt-1">
                Posted: {new Date(ad.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      <style jsx global>{`
        @keyframes titleGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </main>
  );
}
