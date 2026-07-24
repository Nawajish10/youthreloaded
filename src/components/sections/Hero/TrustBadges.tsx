import React from "react";
import { CheckCircle2 } from "lucide-react";

const BADGES = [
  "Certified Trainers",
  "Premium Equipment",
  "Friendly Community",
  "Modern Facilities",
];

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-3 pt-2">
      {BADGES.map((badge) => (
        <div
          key={badge}
          className="flex items-center gap-2 rounded-xl bg-[#151515] border border-white/[0.08] px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-200"
        >
          <CheckCircle2 className="h-4 w-4 text-[#E50914] shrink-0" />
          <span>{badge}</span>
        </div>
      ))}
    </div>
  );
}
