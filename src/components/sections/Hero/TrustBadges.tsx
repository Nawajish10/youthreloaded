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
          className="flex items-center gap-2.5 rounded-2xl bg-white border border-[#E5E7EB] px-4 py-3 text-xs sm:text-sm font-semibold text-[#1F2937] shadow-sm"
        >
          <CheckCircle2 className="h-4 w-4 text-[#34A853] shrink-0" />
          <span>{badge}</span>
        </div>
      ))}
    </div>
  );
}
