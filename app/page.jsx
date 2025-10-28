/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // States for FAQ flipping
  const [flipped, setFlipped] = useState([false, false, false]);

  const toggleFlip = (index) => {
    setFlipped((prev) => {
      const newFlips = [...prev];
      newFlips[index] = !newFlips[index];
      return newFlips;
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center text-center text-white px-6 py-16 overflow-hidden">
      {/* Galaxy Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, #150032 0%, #060016 60%, #000 100%)",
          backgroundSize: "200% 200%",
          animation: "galaxyShift 50s ease-in-out infinite",
        }}
      ></div>

      {/* Stars */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Shooting Stars */}
      <div className="absolute top-[8%] left-0 w-full h-[350px] overflow-visible z-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="shooting-star"
            style={{
              top: `${Math.random() * 30}%`,
              left: `${Math.random() * 83}%`,
              animationDelay: `${i * 0.6 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[90rem]">
        <p
          className="text-3xl mb-2 font-semibold tracking-[8px] text-transparent bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #ffffffcc, #d3cfff, #ffffffcc)",
            backgroundSize: "200% 200%",
            animation: "titleGradient 10s ease-in-out infinite",
            textShadow: "0 0 20px rgba(211, 207, 255, 0.5)",
          }}
        >
          &quot;OFFICIAL&quot;
        </p>

        {/* Clickable Title with Hover Glow */}
        <Link href="/units" passHref>
          <h1
            className="font-extrabold text-[6rem] sm:text-[7rem] md:text-[7.5rem] leading-tight bg-clip-text text-transparent pb-4 mb-5 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #c6a4ff, #f3b5ff, #b9b4ff, #c6a4ff)",
              backgroundSize: "300% 300%",
              animation: "titleGradient 12s ease-in-out infinite",
              textShadow:
                "0 0 40px rgba(198,164,255,0.35), 0 0 70px rgba(243,181,255,0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow =
                "0 0 40px rgba(198,164,255,0.8), 0 0 80px rgba(243,181,255,0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow =
                "0 0 40px rgba(198,164,255,0.35), 0 0 70px rgba(243,181,255,0.25)";
            }}
          >
            Anime Vanguards
            <br />
            Trading Value List
          </h1>
        </Link>

        {/* Intro */}
        <div
          className="mt-10 text-[2.4rem] font-semibold bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #bfaaff, #c7b6ff, #e2d7ff, #bfaaff)",
            backgroundSize: "300% 300%",
            animation: "subtitleSweep 14s linear infinite",
            textShadow:
              "0 0 25px rgba(199,182,255,0.4), 0 0 50px rgba(226,215,255,0.2)",
          }}
        >
          This Value List is Made and Agreed Upon by a Collective Group of AV
          <br />
          Competitive Players and Traders
        </div>

        {/* Creator */}
        <div
          className="text-[2rem] font-medium mt-8 bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #b5e7ff, #a8f0ff, #c6ffff, #b5e7ff)",
            backgroundSize: "300% 300%",
            animation: "subtitleSweep 10s linear infinite",
            textShadow:
              "0 0 25px rgba(181,231,255,0.3), 0 0 60px rgba(198,255,255,0.2)",
          }}
        >
          I am the Creator – <span className="font-bold">King Mo3211</span>
          <br />
          Please Subscribe to my YouTube as Appreciation 🙏
          <br />
          <a
            href="https://www.youtube.com/@King_Mo3211"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f9cb9c] hover:text-[#ffe7b1] transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(255,240,180,0.8)]"
          >
            https://www.youtube.com/@King_Mo3211
          </a>
        </div>

        {/* Credits */}
        <div
          className="max-w-[75rem] text-white/90 mt-3 mb-20 px-4 text-[1.8rem] leading-relaxed"
          style={{
            textShadow: "0 0 20px rgba(249,203,156,0.25)",
          }}
        >
          <p className="mt-3 font-medium">
            <span className="text-[#f9cb9c]">Co-Owners:</span> Me, Ekuzotia, Zog, Pop{" "}
            <br />
            <span className="text-[#f9cb9c]">Value Team:</span> Xon, Gohary,
            Fadi, Simple, Kegs, Exs, Awesometicklenip, Void, Feh, Nathan, Connos, Knull, Nat, Manjiro, Mespiritan
          </p>
        </div>

        {/* Feature Boxes */}
        <div className="w-full max-w-[75rem] flex flex-col sm:flex-row justify-center gap-10 mb-20 text-[1.8rem]">
          {/* Site Features */}
          <div className="flex-1 rounded-3xl p-[2px] bg-[linear-gradient(90deg,#a18cff,#c28cff,#a1d0ff)] animate-gradientSlow">
            <div
              className="rounded-3xl bg-[#0e0e15] p-10 h-full flex flex-col justify-center items-center"
              style={{
                textShadow: "0 0 25px rgba(161,140,255,0.4)",
              }}
            >
              <h2 className="font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#a18cff] to-[#c28cff]">
                Site Features
              </h2>

              {/* Template Site Features with Gradient Borders */}
              <div className="grid gap-6 w-full">
                {[
                  {
                    title: "Search for Units",
                    desc: "Easily locate any unit or familiar by name or rarity.",
                  },
                  {
                    title: "Filter by Value or Demand",
                    desc: "Sort cards to find high-demand or high-value units fast.",
                  },
                  {
                    title: "Stable-Only Mode",
                    desc: "Focus on cards with consistent market stability.",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-[2px] bg-[linear-gradient(90deg,#a18cff,#c28cff,#a1d0ff)]"
                  >
                    <div className="rounded-2xl bg-[#131320] p-6 shadow-md h-full">
                      <p className="font-semibold text-[#c9baff]">
                        {feature.title}
                      </p>
                      <p className="text-white/60 text-[1.6rem] mt-1">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="flex-1 rounded-3xl p-[2px] bg-[linear-gradient(90deg,#88aaff,#b088ff,#c2a8ff)] animate-gradientSlow">
            <div
              className="rounded-3xl bg-[#0e0e15] p-10 h-full flex flex-col justify-center items-center"
              style={{
                textShadow: "0 0 25px rgba(136,170,255,0.4)",
              }}
            >
              <h2 className="font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#88aaff] to-[#b088ff]">
                FAQ
              </h2>
              <p className="text-[1.6rem] text-white mb-8 animate-pulseGlow">
                Click a question to reveal the answer.
              </p>

              {/* Template FAQ Flip Boxes with Borders */}
              <div className="grid gap-6 w-full">
                {[
                  {
                    q: "How often is the list updated?",
                    a: "The list is updated daily based on trading data",
                  },
                  {
                    q: "Who manages the values?",
                    a: "A group of experienced traders and players, listed above",
                  },
                  {
                    q: "Are the values official and accurate?",
                    a: "They are accurate values based on trades, rarity, and me being TUFF ASL, SUBSCRIBE to me, King Mo3211",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`faq-card relative h-[120px] perspective cursor-pointer rounded-2xl p-[2px] bg-[linear-gradient(90deg,#88aaff,#b088ff,#c2a8ff)]`}
                    onClick={() => toggleFlip(i)}
                  >
                    <div
                      className={`faq-inner transition-transform duration-700 transform ${flipped[i] ? "rotate-y-180" : ""
                        } h-full`}
                    >
                      <div className="faq-front absolute inset-0 bg-[#131320] rounded-2xl p-6 flex items-center justify-center text-[1.7rem] font-semibold text-[#c9baff]">
                        {item.q}
                      </div>
                      <div className="faq-back absolute inset-0 bg-[#1c1c2e] rounded-2xl p-6 flex items-center justify-center text-[1.6rem] text-white/70 transform rotate-y-180">
                        {item.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Discord */}
        <div className="max-w-[60rem] w-full rounded-3xl p-[2px] bg-[linear-gradient(90deg,#ff9ee6,#ffb07c,#ffe49e)] animate-gradientSlow mb-20 text-[1.8rem]">
          <div
            className="rounded-3xl bg-[#0e0e15] p-10"
            style={{
              textShadow: "0 0 25px rgba(255,158,230,0.4)",
            }}
          >
            <h2 className="font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#ff9ee6] to-[#ffb07c]">
              Join our Discord
            </h2>
            <p className="text-white/70 mb-6">
              Template placeholder — coming soon.
            </p>
            <button className="px-10 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#ff9ee6] to-[#ffb07c] hover:opacity-90 transition">
              Join Discord
            </button>
          </div>
        </div>

        {/* AV Sheet */}
        <div className="max-w-[70rem] w-full rounded-3xl p-[2px] bg-[linear-gradient(90deg,#ffe49e,#ffb07c,#ff9ee6)] animate-gradientSlow text-[1.8rem] mb-10">
          <div
            className="rounded-3xl bg-[#0e0e15] p-8"
            style={{
              textShadow: "0 0 25px rgba(255,228,158,0.3)",
            }}
          >
            <p className="leading-relaxed text-white/80">
              For other AV inquiries, like Overall Tierlist, DPS Comparison
              Sheets, and Unit/Familiar Obtainment info, refer to{" "}
              <a
                href="https://docs.google.com/spreadsheets/d/11aH9bAatxfnMfuqJz7wG8RdWotIT0k6xELix12HczHM/edit?gid=106537974#gid=106537974"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f9cb9c] hover:text-[#ffe7b1] transition-colors duration-300 font-semibold"
              >
                The AV Sheet
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
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

        @keyframes subtitleSweep {
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

        @keyframes galaxyShift {
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

        @keyframes pulseGlow {
          0%,
          100% {
            text-shadow: 0 0 15px rgba(255, 240, 180, 0.4);
          }
          50% {
            text-shadow: 0 0 25px rgba(255, 240, 180, 0.8);
          }
        }

        .animate-pulseGlow {
          animation: pulseGlow 2.5s ease-in-out infinite;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          opacity: 0.6;
          border-radius: 50%;
          animation: twinkle 4s infinite ease-in-out alternate;
        }

        @keyframes twinkle {
          0% {
            opacity: 0.2;
          }
          100% {
            opacity: 0.8;
          }
        }

        .shooting-star {
          position: absolute;
          width: 100px;
          height: 2px;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.8) 20%,
            rgba(160, 120, 255, 0.6) 60%,
            rgba(255, 120, 200, 0) 100%
          );
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.8));
          opacity: 0;
          animation: diagonalShoot 3s ease-out infinite,
            shimmer 1.5s ease-in-out infinite;
        }

        @keyframes diagonalShoot {
          0% {
            transform: translate(-30px, -30px) rotate(45deg) scaleX(1);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          50% {
            transform: translate(150px, 150px) rotate(45deg) scaleX(0.5);
            opacity: 0.8;
          }
          80% {
            transform: translate(250px, 250px) rotate(45deg) scaleX(0.15);
            opacity: 0.3;
          }
          100% {
            transform: translate(450px, 450px) rotate(45deg) scaleX(0);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0%,
          100% {
            filter: brightness(1)
              drop-shadow(0 0 6px rgba(255, 255, 255, 0.5));
          }
          50% {
            filter: brightness(1.3)
              drop-shadow(0 0 12px rgba(255, 255, 255, 0.9));
          }
        }

        .animate-gradientSlow {
          animation: subtitleSweep 10s ease-in-out infinite;
          background-size: 300% 300%;
        }

        /* Flip card styling */
        .perspective {
          perspective: 1000px;
        }
        .faq-inner {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .faq-front,
        .faq-back {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
