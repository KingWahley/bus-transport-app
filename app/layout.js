import "./globals.css";
import "react-day-picker/dist/style.css";
import { Space_Grotesk, Manrope, Dancing_Script } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "TG-Motors",
  description: "Book seats, track journeys, and travel in premium comfort.",
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const signature = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable} ${signature.variable}`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_70%)]" />
          </div>

          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
