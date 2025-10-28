"use client";
import { useMemo, useState } from "react";
import unitsRaw from "../data/units.json";
import CompactUnitCard from "./CompactUnitCard";

function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export default function UnitPickerModal({ onClose, onSelect }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("value-desc");

  const isTradeHub =
    typeof window !== "undefined" &&
    window.location.pathname.toLowerCase().includes("tradehub");

  const isTradeCalculator =
    typeof window !== "undefined" &&
    window.location.pathname.toLowerCase().includes("tradecalculator");

  const units = useMemo(() => {
    return unitsRaw
      .map((u) => ({
        ...u,
        _value: toNumber(u.Value),
        _name: String(u.Name || "").trim(),
        _category: String(u.Category || "").trim(),
      }))
      .filter((u) => u._name.length > 0);
  }, []);

  const categories = useMemo(() => {
    const set = new Set(units.map((u) => u._category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [units]);

  const filtered = useMemo(() => {
    let list = units;
    if (q.trim()) {
      const ql = q.toLowerCase();
      list = list.filter(
        (u) =>
          u._name.toLowerCase().includes(ql) ||
          (u.Justification || "").toLowerCase().includes(ql) ||
          (u.Obtainment || "").toLowerCase().includes(ql)
      );
    }
    if (category !== "All") list = list.filter((u) => u._category === category);
    if (sort === "value-desc") list = [...list].sort((a, b) => b._value - a._value);
    else if (sort === "value-asc") list = [...list].sort((a, b) => a._value - b._value);
    else if (sort === "name-asc") list = [...list].sort((a, b) => a._name.localeCompare(b._name));
    else if (sort === "name-desc") list = [...list].sort((a, b) => b._name.localeCompare(a._name));
    return list;
  }, [units, q, category, sort]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div
  className="relative rounded-2xl max-w-7xl w-[95vw] shadow-2xl border overflow-hidden flex flex-col"
  style={{
    maxHeight: isTradeCalculator
      ? "100vh" // taller only in Trade Calculator
      : isTradeHub
      ? "60vh" // Trade Hub height
      : "53vh", // default elsewhere
    width: isTradeCalculator
      ? "75vw"
      : isTradeHub
      ? "70vw"
      : "95vw",
    background:
      "radial-gradient(circle at center, rgba(20,0,40,0.95) 0%, rgba(5,0,20,0.8) 60%, rgba(0,0,0,0) 100%)",
    borderColor: "rgba(180,150,255,0.35)",
    boxShadow: "0 0 32px rgba(200,170,255,0.25)",
  }}
>

        {/* Header */}
        <div
          className="flex items-center justify-center px-6 py-2 border-b relative"
          style={{ borderColor: "rgba(180,150,255,0.25)" }}
        >
          <h2
            className="text-2xl font-bold text-center"
            style={{
              background:
                "linear-gradient(90deg, #b892ff, #e0b3ff, #caa4ff, #b892ff)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow:
                "0 0 10px rgba(190,150,255,0.35), 0 0 20px rgba(240,200,255,0.25)",
            }}
          >
            Select What to Add
          </h2>
          <button
            className="absolute right-4 text-red-400 hover:text-red-200 text-2xl px-2 py-0 rounded-lg transition hover:shadow-[0_0_15px_rgba(255,50,50,0.7)]"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Controls */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-3 px-6 py-3 border-b"
          style={{ borderColor: "rgba(180,150,255,0.25)" }}
        >
<style jsx>{`
  @keyframes galaxyPulse {
    0% {
      box-shadow: 0 0 8px rgba(200, 150, 255, 0.25),
        0 0 16px rgba(180, 120, 255, 0.15);
    }
    50% {
      box-shadow: 0 0 20px rgba(220, 180, 255, 0.45),
        0 0 36px rgba(190, 150, 255, 0.35);
    }
    100% {
      box-shadow: 0 0 8px rgba(200, 150, 255, 0.25),
        0 0 16px rgba(180, 120, 255, 0.15);
    }
  }

  /* Search bar stays rounded */
  input {
    border-radius: 9999px;
  }

  /* Dropdowns get soft box shape */
  select {
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    background: linear-gradient(
      145deg,
      rgba(35, 0, 70, 0.9),
      rgba(15, 0, 35, 0.85)
    );
    color: #f0e8ff;
    border: 1px solid rgba(210, 180, 255, 0.5);
  }

  /* Pulsing glow for dropdowns and input */
  select:focus,
  select:hover,
  input:focus {
    animation: galaxyPulse 2.8s ease-in-out infinite;
    outline: none;
  }

  /* Dropdown list styling */
  select option {
    background: rgba(25, 0, 50, 0.92);
    color: #e7d4ff;
    transition: background 0.25s ease, color 0.25s ease, box-shadow 0.3s ease;
  }

  /* Hovered options glow softly outward */
  select option:hover,
  select option:focus {
    background: linear-gradient(90deg, #a66cff, #e3b7ff);
    color: #fff;
    box-shadow: 0 0 10px rgba(190, 150, 255, 0.4),
      0 0 20px rgba(180, 120, 255, 0.3);
  }

  /* Active dropdown appearance */
  select:focus {
    background: linear-gradient(
      145deg,
      rgba(40, 0, 80, 0.95),
      rgba(15, 0, 40, 0.9)
    );
    box-shadow: 0 0 20px rgba(200, 150, 255, 0.45);
  }

  /* Scrollbar inside dropdown */
  select::-webkit-scrollbar {
    width: 8px;
  }
  select::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #b891ff, #7a55ff);
    border-radius: 8px;
  }
  select::-webkit-scrollbar-track {
    background: rgba(25, 0, 50, 0.5);
  }

  select::-ms-expand {
    display: none;
  }

  select:focus-visible {
    background: rgba(30, 0, 70, 0.9);
  }
`}</style>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="px-4 py-2 outline-none placeholder-white/70"
            style={{
              background:
                "linear-gradient(145deg, rgba(35,0,70,0.9), rgba(15,0,35,0.85))",
              color: "white",
              border: "1px solid rgba(210,180,255,0.5)",
              boxShadow: "0 0 10px rgba(180,120,255,0.15)",
            }}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 outline-none cursor-pointer transition-all duration-200 hover:shadow-[0_0_10px_rgba(200,150,255,0.4)]"
            style={{
              background:
                "linear-gradient(145deg, rgba(35,0,70,0.9), rgba(15,0,35,0.85))",
              color: "#f0e8ff",
              border: "1px solid rgba(210,180,255,0.5)",
            }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 outline-none cursor-pointer transition-all duration-200 hover:shadow-[0_0_10px_rgba(200,150,255,0.4)]"
            style={{
              background:
                "linear-gradient(145deg, rgba(35,0,70,0.9), rgba(15,0,35,0.85))",
              color: "#f0e8ff",
              border: "1px solid rgba(210,180,255,0.5)",
            }}
          >
            <option value="value-desc">Sort: Value (High → Low)</option>
            <option value="value-asc">Sort: Value (Low → High)</option>
            <option value="name-asc">Sort: Name (A → Z)</option>
            <option value="name-desc">Sort: Name (Z → A)</option>
          </select>
        </div>

        {/* Compact Grid */}
   <div
  className="p-6 overflow-y-auto flex-1 custom-scrollbar"
  style={{
    overflowX: "hidden",        // ❌ prevents horizontal scroll
    scrollbarWidth: "thin",
    scrollbarColor: "#b891ff rgba(40,0,80,0.4)",
  }}
>

          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(25, 0, 50, 0.6);
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(180deg, #b891ff, #7a55ff);
              border-radius: 8px;
              box-shadow: 0 0 6px rgba(190, 150, 255, 0.5);
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(180deg, #d4b3ff, #9e6fff);
            }
          `}</style>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-1 gap-x-4 justify-center">
            {filtered.map((u, i) => {
              const compactShape = {
                Name: u._name,
                Category: u._category,
                Image: u.Image,
                Value: u._value,
              };
              return (
                <button
                  key={i}
                  onClick={() =>
                    onSelect({
                      ...u,
                      Name: u._name,
                      Category: u._category,
                      Value: u._value,
                    })
                  }
                  className="group block rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 hover:scale-105 transition-transform"
                  style={{
                    background: "transparent",
                    transform: "scale(1.15)",
                  }}
                >
                  <div className="relative">
                    <div style={{ transform: "scale(0.75)" }}>
                      <CompactUnitCard u={compactShape} clickable={false} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
