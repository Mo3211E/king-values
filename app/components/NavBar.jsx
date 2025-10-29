"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  const [shootingStars, setShootingStars] = useState([]);
  const [scrollVisible, setScrollVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [barVisible, setBarVisible] = useState(true); // 🌟 new state

  // 🎇 Generate randomized shooting stars
  useEffect(() => {
    const colorOptions = [
      "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9), rgba(255,200,220,0.8), rgba(255,255,255,0))",
      "linear-gradient(to right, rgba(255,255,255,0), rgba(255,240,250,0.9), rgba(255,180,210,0.8), rgba(255,255,255,0))",
      "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9), rgba(255,210,240,0.9), rgba(255,255,255,0))",
      "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1), rgba(255,200,230,1), rgba(255,255,255,0))",
    ];

    const shootingArray = Array.from({ length: 150 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
      animationDelay: `${Math.random() * 2.5}s`,
      animationDuration: `${2 + Math.random() * 1.5}s`,
    }));
    setShootingStars(shootingArray);
  }, []);

  // 📜 Scroll listener: hides navbar content on scroll down, reappears on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 50) {
        setScrollVisible(false);
      } else {
        setScrollVisible(true);
      }
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  // ⮟ Toggle bar + stars
  const toggleNavbar = () => {
    setBarVisible((prev) => !prev);
  };

 const navItems = [
  { href: "/", label: "Home", icon: "/icons/home.png" },
  { href: "/units", label: "Values", icon: "/icons/values.png" },
  { href: "/trade-calculator", label: "Trade Calculator", icon: "/icons/trade-calculator.png" },
  { href: "/trade-hub", label: "Trade Hub", icon: "/icons/trade-hub.png" },
];

  return (
    <>
      {/* 🌌 Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full px-8 py-[0.7rem] flex items-center justify-between z-50 overflow-hidden transition-all duration-700 ${
          scrollVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        {/* ⭐ Shooting Stars + Border (toggleable) */}
        {barVisible && (
          <>
            <div className="absolute inset-0 z-0 overflow-hidden">
              {shootingStars.map((s, i) => (
                <div
                  key={`shoot-${i}`}
                  className="nav-shooting-star"
                  style={{
                    top: s.top,
                    left: s.left,
                    animationDelay: s.animationDelay,
                    animationDuration: s.animationDuration,
                    background: s.color,
                  }}
                />
              ))}
            </div>
            <div
              className="absolute inset-0 z-0"
              style={{
                background: "rgba(10, 0, 30, 0.7)",
                borderBottom: "1px solid rgba(220,190,255,0.3)",
                boxShadow: "0 0 25px rgba(220,190,255,0.25)",
              }}
            />
          </>
        )}

        {/* ✨ Title */}
        <Link href="/" className="z-10 cursor-pointer select-none">
          <h1
            className="font-extrabold text-[1.6rem] sm:text-[2rem] leading-none bg-clip-text text-transparent transition-all duration-300 hover:scale-[1.05]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #ffe6ff, #f7d9ff, #ffffff, #ffe6ff)",
              backgroundSize: "300% 300%",
              animation: "titleGradient 12s ease-in-out infinite",
              textShadow:
                "0 0 15px rgba(255,230,255,0.45), 0 0 30px rgba(255,210,250,0.25)",
            }}
          >
            AV Values
          </h1>
        </Link>

        {/* 🔹 Navigation Links */}
        <div className="z-10 flex space-x-3 text-[0.95rem]">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center gap-1.5 px-3 py-[0.3rem] rounded-lg transition-all duration-200 hover:scale-[1.03]"
              style={{
                background:
                  "linear-gradient(145deg, rgba(35,0,70,0.85), rgba(15,0,35,0.7))",
                color: "#fff0ff",
                border: "1px solid rgba(240,200,255,0.5)",
                boxShadow: "0 0 6px rgba(255,220,255,0.2)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 14px rgba(255,220,255,0.5)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 6px rgba(255,220,255,0.2)")
              }
            >
<Image
  src={item.icon}
  alt={item.label + " icon"}
  width={24}
  height={24}
  unoptimized
  priority
  className="inline-block icon-clean"
/>

              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* ✨ CSS Animations */}
        <style jsx>{`
          .nav-shooting-star {
            position: absolute;
            width: 110px;
            height: 2px;
            border-radius: 1px;
            opacity: 0;
            filter: drop-shadow(0 0 8px rgba(255, 240, 255, 0.9));
            animation: horizontalShoot linear infinite;
          }

          @keyframes horizontalShoot {
            0% {
              transform: translateX(-200px);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            100% {
              transform: translateX(2000px);
              opacity: 0;
            }
          }

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

        <style jsx global>{`
  .icon-clean {
    filter: brightness(0) invert(1); /* Makes them white */
    opacity: 0.9;
    transition: opacity 0.3s ease, filter 0.3s ease;
  }

  .icon-clean:hover {
    filter: brightness(1.2) drop-shadow(0 0 6px rgba(255, 200, 255, 0.6));
    opacity: 1;
  }
`}</style>

      </nav>

      {/* ⮟ Arrow Button */}
      <div
        onClick={toggleNavbar}
        className={`fixed left-1/2 transform -translate-x-1/2 top-[0.5rem] z-50 cursor-pointer transition-all duration-700 ${
          scrollVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <div
          className={`w-9 h-9 flex items-center justify-center rounded-full border border-pink-300/50 bg-black/40 hover:bg-black/60 backdrop-blur-sm shadow-[0_0_10px_rgba(255,200,255,0.3)] transition-all duration-500 ${
            barVisible ? "rotate-180" : "rotate-0"
          }`}
        >
          <span className="text-pink-200 text-lg transition-transform duration-500">
            ⮟
          </span>
        </div>
      </div>
    </>
  );
}