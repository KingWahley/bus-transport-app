"use client";

import Link from "next/link";
import { Home, LifeBuoy, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import StaggeredMenu from "./StaggeredMenu";

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Desktop navigation (NO "Book later")
  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "/about", icon: LifeBuoy },
  ];

  // Mobile navigation (includes "Book later")
  const mobileNavItems = [
    { label: "Home", href: "/" },
    { label: "Book", href: "/booking" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 p-2 shadow-2xl shadow-slate-200/50 backdrop-blur-xl">
        
        {/* Logo */}
        <Link href="/" className="mr-2 flex items-center gap-3 px-4">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-white">
            <Zap className="h-4 w-4 fill-current" />
          </div>
          <span className="font-heading text-sm font-bold tracking-tight text-slate-900 hidden sm:block">
            TG-MOTORS
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="hidden md:block">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="ml-2 pl-2 border-l border-slate-200">
          <Link
            href="/booking"
            className="flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-emerald-400 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]"
          >
            <span>Book Now</span>
            <Zap className="h-4 w-4 fill-current" />
          </Link>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className="md:hidden">
        <StaggeredMenu
          isFixed
          items={mobileNavItems.map((item) => ({
            label: item.label,
            link: item.href,
          }))}
          socialItems={socialItems}
          menuButtonColor="#0f172a"
          openMenuButtonColor="#0f172a"
          colors={["#10b981", "#34d399", "#059669"]}
          customLogo={
            <Link href="/" className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-white">
                <Zap className="h-4 w-4 fill-current" />
              </div>
              <span className="font-heading text-sm font-bold tracking-tight text-slate-900">
                TG-MOTORS
              </span>
            </Link>
          }
          headerClassName={`!fixed !top-6 !left-6 !right-6 !w-auto !p-2 rounded-full border border-slate-200 transition-all duration-300 z-[60] ${
            isScrolled
              ? "!bg-white/30 shadow-2xl shadow-slate-200/50 backdrop-blur-xl"
              : "!bg-white shadow-sm"
          }`}
        />
      </div>
    </header>
  );
}
