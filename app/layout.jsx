import './globals.css'
import GalaxyBackground from "./components/GalaxyBackground";
import NavBar from "./components/NavBar";
import ScrollFade from "./components/ScrollFade"; // ← add this

export const metadata = {
  title: 'AV Values',
  description: 'Anime Vanguard Value Reference',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden text-white bg-black">
        <GalaxyBackground />
        <ScrollFade /> {/* ← mount once, globally */}
        <NavBar />
        <main className="relative z-10 pt-28">{children}</main>
      </body>
    </html>
  );
}
