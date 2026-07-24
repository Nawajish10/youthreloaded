"use client";

import React from "react";
import { FadeUp } from "@/components/animations/FadeUp";

export function FacilitiesSection() {
  const facilities = [
    { title: "Strength Zone", icon: "fitness_center" },
    { title: "Cardio Deck", icon: "monitor_heart" },
    { title: "Recovery Area", icon: "pool" },
    { title: "Group Classes", icon: "groups" },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#090909]" id="facilities">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <h2 className="font-headline-lg text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mb-8">
            Premium <span className="text-[#E50914]">Facilities</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {facilities.map((item) => (
              <div
                key={item.title}
                className="bg-[#111111] p-6 rounded-2xl flex flex-col items-center text-center justify-center aspect-square gap-4 border border-white/10 hover:border-[#E50914]/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#E50914]/10 flex items-center justify-center text-[#E50914]">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.icon}
                  </span>
                </div>
                <span className="font-label-sm text-sm text-[#e2e1eb] uppercase tracking-wider">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
