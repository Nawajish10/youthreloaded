"use client";

import React from "react";
import { Dumbbell, HeartPulse, Sparkles, Users } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";

export function FacilitiesSection() {
  const facilities = [
    { title: "Strength Zone", desc: "Heavy racks & dumbbells", icon: Dumbbell },
    { title: "Cardio Deck", desc: "Treadmills & rowers", icon: HeartPulse },
    { title: "Recovery Area", desc: "Steam & stretch lounge", icon: Sparkles },
    { title: "Group Classes", desc: "HIIT & functional fitness", icon: Users },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8FAF8] border-b border-[#E5E7EB]" id="facilities">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1F6F50]/10 px-4 py-1.5 border border-[#1F6F50]/20 text-xs font-mono font-bold uppercase tracking-widest text-[#1F6F50] mb-3">
              <span>Our Facilities</span>
            </div>
            <h2 className="font-headline-lg text-3xl sm:text-4xl font-black uppercase text-[#1F2937] tracking-tight">
              World-Class <span className="text-[#1F6F50]">Facilities</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {facilities.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white p-6 rounded-2xl flex flex-col items-center text-center justify-center aspect-square gap-3 border border-[#E5E7EB] hover:border-[#34A853] transition-all shadow-sm hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-full bg-[#34A853]/10 flex items-center justify-center text-[#34A853]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-headline-lg text-base font-black text-[#1F2937] uppercase tracking-wider">
                    {item.title}
                  </span>
                  <span className="text-xs text-[#6B7280]">
                    {item.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
