"use client";

import React from "react";
import { Accordion } from "@/components/ui/Accordion";
import { FadeUp } from "@/components/animations/FadeUp";
import { HelpCircle } from "lucide-react";

export function FAQSection() {
  const faqs = [
    {
      id: "faq-1",
      title: "What are the gym operating hours?",
      content:
        "Youth Gym Reloaded is open 7 days a week from 5:00 AM to 11:00 PM. Flexible morning, afternoon, and evening slots are available.",
    },
    {
      id: "faq-2",
      title: "Is there any registration fee for joining?",
      content:
        "We offer FREE registration on all 3 Months, 6 Months, and 1 Year membership plans! Only the 1-month plan has a nominal one-time ₹500 registration fee.",
    },
    {
      id: "faq-3",
      title: "Can I get a trial workout pass before joining?",
      content:
        "Yes! Fill out the registration form on this page and our fitness advisor will arrange a complimentary 1-day pass for you.",
    },
    {
      id: "faq-4",
      title: "Do you provide personal trainers and custom diet plans?",
      content:
        "Absolutely. Certified trainers are always on the gym floor to guide you, and our multi-month plans include customized workout & nutrition guidance.",
    },
    {
      id: "faq-5",
      title: "What amenities are included in the membership?",
      content:
        "All memberships include full access to the strength zone, cardio deck, steam & shower rooms, lockers, CCTV security, and free Wi-Fi.",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8FAF8] relative border-b border-[#E5E7EB]" id="faq">
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1F6F50]/10 px-4 py-1.5 border border-[#1F6F50]/20 text-xs font-mono font-bold uppercase tracking-widest text-[#1F6F50] mb-3">
              <HelpCircle className="h-4 w-4 text-[#34A853]" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="font-headline-lg text-3xl sm:text-4xl font-black uppercase text-[#1F2937] tracking-tight">
              Got <span className="text-[#1F6F50]">Questions?</span> We&apos;ve Got Answers
            </h2>
          </div>

          {/* Accordion Card */}
          <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-md">
            <Accordion items={faqs} />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
