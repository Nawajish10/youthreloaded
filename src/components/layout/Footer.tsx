import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-[#0D3828] text-white border-t border-[#1F6F50]">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-12 max-w-7xl mx-auto gap-8">
        <div className="text-center md:text-left flex flex-col md:flex-row items-center gap-6">
          <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-[#34A853]/40 p-0.5 shadow-md bg-white">
            <Image
              src="/images/youth-gym-logo.jpg"
              alt="Youth Gym Reloaded Logo"
              width={64}
              height={64}
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
          <div>
            <div className="flex flex-col items-center md:items-start">
              <div className="font-headline-lg-mobile text-xl sm:text-2xl text-white font-black uppercase tracking-tight leading-none">
                Youth <span className="text-[#34A853]">Reloaded</span>
              </div>
              <div className="font-mono text-[11px] text-[#34A853] font-bold uppercase tracking-widest mt-1">
                BURN | BUILD | BECOME
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-white/80 font-label-sm text-[12px] items-center justify-center md:justify-start uppercase tracking-wider mt-3">
              <a
                href="https://www.instagram.com/youthgym_reloaded?igsh=ZGp3bnBqMHNwNWlp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#34A853] transition-colors hover:underline text-[#34A853] font-bold"
              >
                Instagram (@youthgym_reloaded)
              </a>
              <span className="text-white/30">•</span>
              <Link className="hover:text-[#34A853] transition-colors hover:underline" href="/privacy-policy">
                Privacy Policy
              </Link>
              <span className="text-white/30">•</span>
              <Link className="hover:text-[#34A853] transition-colors hover:underline" href="/terms">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 font-mono text-white/70 text-center text-xs uppercase tracking-wider">
          <a
            href="https://www.instagram.com/youthgym_reloaded?igsh=ZGp3bnBqMHNwNWlp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#34A853] transition-colors font-bold flex items-center gap-1.5"
          >
            <span>Follow on Instagram</span>
            <span>→</span>
          </a>
          <div>© {new Date().getFullYear()} YOUTH GYM RELOADED. ALL RIGHTS RESERVED.</div>
        </div>
      </div>
    </footer>
  );
}
