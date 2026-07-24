"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Membership Plans", href: "#membership" },
  { label: "Facilities", href: "#why-choose-us" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const isScrolled = useScroll(20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-[42px] z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-[#090909]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-xl shadow-black/50"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Gym Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-red-600/30 p-0.5 transition-transform group-hover:scale-105 shadow-[0_0_15px_rgba(229,9,20,0.3)] bg-black">
            <Image
              src="/images/youth-gym-logo.jpg"
              alt="Youth Gym Reloaded Logo"
              width={48}
              height={48}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-headline-lg-mobile text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-none">
              Youth <span className="text-[#E50914]">Reloaded</span>
            </span>
            <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-widest">
              BURN | BUILD | BECOME
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-neutral-300 hover:text-[#E50914] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Join Now Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#register"
            className="bg-[#E50914] text-white font-extrabold text-xs tracking-widest uppercase px-6 py-2.5 rounded-full hover:bg-[#c70710] hover:scale-105 transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)]"
          >
            Join Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href="#register"
            className="bg-[#E50914] text-white font-extrabold text-[11px] tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(229,9,20,0.4)]"
          >
            Join Now
          </a>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-neutral-300 hover:text-white"
            aria-label="Toggle Navigation Drawer"
          >
            <Menu className="h-6 w-6 text-[#E50914]" />
          </button>
        </div>

        {/* Mobile Drawer */}
        <Drawer
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          title="Youth Reloaded Navigation"
          position="right"
        >
          <div className="flex flex-col gap-6 pt-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-bold text-neutral-100 hover:text-[#E50914] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-6 border-t border-white/[0.08] flex flex-col gap-3">
              <a
                href="#register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#E50914] text-white font-extrabold text-center py-3.5 rounded-full text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(229,9,20,0.4)]"
              >
                Join Now
              </a>
            </div>
          </div>
        </Drawer>
      </div>
    </header>
  );
}
