"use client";

import React from "react";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { CONTACT_INFO } from "@/lib/constants";

export function ContactSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8FAF8] relative border-b border-[#E5E7EB]" id="contact">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1F6F50]/10 px-4 py-1.5 border border-[#1F6F50]/20 text-xs font-mono font-bold uppercase tracking-widest text-[#1F6F50] mb-3">
              <span>Contact Us</span>
            </div>
            <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-[#1F2937] tracking-tight">
              Visit <span className="text-[#1F6F50]">Youth Gym Reloaded</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] mt-2">
              Have questions or want to tour our facility in person? Get in touch with us!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Location */}
            <div className="bg-white border border-[#E5E7EB] p-6 sm:p-8 rounded-3xl flex flex-col justify-between hover:border-[#34A853] transition-all shadow-sm">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#34A853]/10 text-[#34A853] flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1F2937] uppercase tracking-tight mb-2">Our Location</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{CONTACT_INFO.address}</p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#1F6F50] hover:underline"
              >
                Get Directions →
              </a>
            </div>

            {/* Hours */}
            <div className="bg-white border border-[#E5E7EB] p-6 sm:p-8 rounded-3xl flex flex-col justify-between hover:border-[#34A853] transition-all shadow-sm">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#34A853]/10 text-[#34A853] flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1F2937] uppercase tracking-tight mb-2">Operating Hours</h3>
                <div className="space-y-1 text-sm text-[#6B7280]">
                  <p><strong className="text-[#1F2937]">Monday - Saturday:</strong> 5:00 AM - 11:00 PM</p>
                  <p><strong className="text-[#1F2937]">Sunday:</strong> 6:00 AM - 8:00 PM</p>
                </div>
              </div>
              <div className="mt-6 text-xs font-mono font-bold uppercase tracking-widest text-[#34A853] flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#34A853] animate-ping" />
                Open Today
              </div>
            </div>

            {/* Call / WhatsApp */}
            <div className="bg-white border border-[#E5E7EB] p-6 sm:p-8 rounded-3xl flex flex-col justify-between hover:border-[#34A853] transition-all shadow-sm">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#34A853]/10 text-[#34A853] flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1F2937] uppercase tracking-tight mb-2">Direct Contact</h3>
                <p className="text-sm text-[#6B7280] mb-1">{CONTACT_INFO.phone}</p>
                <p className="text-xs text-[#6B7280]">{CONTACT_INFO.email}</p>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <a
                  href="tel:+917074975231"
                  className="flex-1 py-3 bg-[#34A853] text-white text-xs font-bold uppercase tracking-widest rounded-xl text-center hover:bg-[#2E9548] transition-colors shadow-sm"
                >
                  Call Now
                </a>
                <a
                  href="https://wa.me/917479207804?text=Hi%20Youth%20Gym%20Reloaded!%20I%20want%20to%20know%20more%20about%20membership%20plans."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#25D366]/10 border border-[#25D366]/40 text-[#25D366] rounded-xl hover:bg-[#25D366] hover:text-white transition-colors shadow-xs"
                  aria-label="WhatsApp Us"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
