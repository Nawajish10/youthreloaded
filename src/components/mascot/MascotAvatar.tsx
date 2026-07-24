"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

export type MascotPose =
  | "waving"
  | "phone"
  | "pointing_age"
  | "measuring"
  | "lifting"
  | "flexing"
  | "membership"
  | "celebrate"
  | "typing"
  | "confused"
  | "thumbsup";

interface MascotAvatarProps {
  pose: MascotPose;
  step?: number;
  isTyping?: boolean;
  hasError?: boolean;
  isSuccess?: boolean;
  className?: string;
}

export function MascotAvatar({
  pose,
  step = 1,
  isTyping = false,
  hasError = false,
  isSuccess = false,
  className = "",
}: MascotAvatarProps) {
  const [lottieData, setLottieData] = useState<Record<string, unknown> | null>(null);

  // Map step to Lottie filename
  useEffect(() => {
    let file = "/lottie/welcome.json";
    if (step === 2) file = "/lottie/phone.json";
    else if (step === 3 || step === 4 || step === 5 || step === 6) file = "/lottie/fitness.json";
    else if (step === 7) file = "/lottie/membership.json";
    else if (step === 8 || isSuccess) file = "/lottie/success.json";

    fetch(file)
      .then((res) => res.json())
      .then((data) => setLottieData(data))
      .catch((err) => console.error("Lottie load error:", err));
  }, [step, isSuccess]);

  // Determine active visual pose
  const activePose = hasError
    ? "confused"
    : isSuccess
    ? "celebrate"
    : isTyping
    ? "typing"
    : pose;

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Soft Light Green Aura Glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-36 h-36 rounded-full bg-[#22C55E]/15 blur-2xl pointer-events-none"
      />

      {/* Main Mascot Card Wrapper */}
      <motion.div
        key={activePose}
        initial={{ scale: 0.9, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-white/80 border border-[#22C55E]/20 p-2 shadow-lg backdrop-blur-md flex items-center justify-center overflow-hidden"
      >
        {/* Custom Anime Chibi Gym Mascot (Ren) Vector Graphics */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-md overflow-visible"
        >
          <defs>
            {/* Tracksuit Green Gradient */}
            <linearGradient id="renTracksuit" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>

            {/* Hair Shadow Gradient */}
            <linearGradient id="renHair" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* 1. Tracksuit Body & Shoulders */}
          <g id="body">
            <path
              d="M 50 145 Q 100 130 150 145 L 160 200 L 40 200 Z"
              fill="url(#renTracksuit)"
              stroke="#090909"
              strokeWidth="3"
            />
            {/* White Tracksuit Stripes */}
            <path
              d="M 65 142 L 55 200 M 135 142 L 145 200"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Youth Gym Reloaded Emblem */}
            <circle cx="85" cy="165" r="8" fill="#FFFFFF" />
            <text x="85" y="168" fontSize="8" fontWeight="bold" fill="#15803D" textAnchor="middle">
              YR
            </text>
          </g>

          {/* 2. Head & Neck */}
          <g id="head">
            <path
              d="M 90 120 L 110 120 L 105 132 L 95 132 Z"
              fill="#FDE68A"
              stroke="#090909"
              strokeWidth="2"
            />
            {/* Chibi Face Shape */}
            <ellipse
              cx="100"
              cy="90"
              rx="42"
              ry="38"
              fill="#FEF3C7"
              stroke="#090909"
              strokeWidth="3"
            />
            {/* Cheeks Rosy Blush */}
            <ellipse cx="72" cy="98" rx="7" ry="4" fill="#FCA5A5" opacity="0.6" />
            <ellipse cx="128" cy="98" rx="7" ry="4" fill="#FCA5A5" opacity="0.6" />
          </g>

          {/* 3. Anime Spiky Hair with Emerald Streak */}
          <g id="hair">
            <path
              d="M 60 85 Q 50 50 70 40 Q 80 55 90 35 Q 105 50 120 35 Q 130 50 140 45 Q 145 75 140 90 Q 130 65 120 70 C 110 65 90 65 60 85 Z"
              fill="url(#renHair)"
              stroke="#090909"
              strokeWidth="3"
            />
            {/* Signature Emerald Green Hair Highlights */}
            <path
              d="M 75 42 Q 85 58 95 38 Q 105 52 118 38"
              fill="none"
              stroke="#22C55E"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Black Gym Headband */}
            <path
              d="M 60 70 Q 100 62 140 70 L 138 78 Q 100 70 62 78 Z"
              fill="#0F172A"
            />
          </g>

          {/* 4. Expressive Anime Eyes */}
          <g id="eyes">
            {activePose === "confused" ? (
              // Confused Eyes >_<
              <>
                <path d="M 76 84 L 90 92 M 90 84 L 76 92" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 110 84 L 124 92 M 124 84 L 110 92" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
              </>
            ) : activePose === "celebrate" || activePose === "thumbsup" ? (
              // Happy Happy Eyes ^_^
              <>
                <path d="M 75 90 Q 84 78 93 90" fill="none" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
                <path d="M 107 90 Q 116 78 125 90" fill="none" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              </>
            ) : (
              // Big Friendly Sparkly Anime Eyes
              <>
                <ellipse cx="84" cy="88" rx="7" ry="9" fill="#0F172A" />
                <ellipse cx="116" cy="88" rx="7" ry="9" fill="#0F172A" />
                {/* Eye Sparkle Catchlights */}
                <circle cx="86" cy="85" r="2.5" fill="#FFFFFF" />
                <circle cx="118" cy="85" r="2.5" fill="#FFFFFF" />
              </>
            )}
          </g>

          {/* 5. Mouth & Expression */}
          <g id="mouth">
            {activePose === "confused" ? (
              <path d="M 92 108 Q 100 102 108 108" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            ) : activePose === "celebrate" || activePose === "thumbsup" ? (
              <path d="M 88 104 Q 100 120 112 104 Z" fill="#EF4444" stroke="#0F172A" strokeWidth="2.5" />
            ) : (
              <path d="M 92 104 Q 100 112 108 104" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            )}
          </g>

          {/* 6. Pose Props & Hand Gestures */}
          <g id="props">
            {activePose === "waving" && (
              // Waving Hand 👋
              <motion.g
                animate={{ rotate: [0, 20, -10, 20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ transformOrigin: "145px 135px" }}
              >
                <path d="M 140 135 L 165 110 L 175 118 L 150 145 Z" fill="#FEF3C7" stroke="#090909" strokeWidth="3" />
                <circle cx="170" cy="112" r="6" fill="#FEF3C7" stroke="#090909" strokeWidth="2" />
              </motion.g>
            )}

            {activePose === "phone" && (
              // Holding Smartphone 📱
              <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <rect x="135" y="110" width="22" height="38" rx="4" fill="#090909" stroke="#22C55E" strokeWidth="2" />
                <rect x="138" y="114" width="16" height="28" rx="2" fill="#22C55E" opacity="0.8" />
              </motion.g>
            )}

            {activePose === "lifting" && (
              // Dumbbells 💪
              <g>
                <rect x="30" y="125" width="25" height="8" rx="2" fill="#090909" />
                <rect x="145" y="125" width="25" height="8" rx="2" fill="#090909" />
              </g>
            )}

            {activePose === "thumbsup" && (
              // Thumbs Up 👍
              <g>
                <circle cx="155" cy="120" r="10" fill="#FEF3C7" stroke="#090909" strokeWidth="2" />
                <path d="M 155 110 L 155 125" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
              </g>
            )}
          </g>
        </svg>

        {/* Lottie Overlay Animation */}
        {lottieData && (
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <Lottie animationData={lottieData} loop={true} />
          </div>
        )}
      </motion.div>

      {/* Mascot Name Badge */}
      <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[10px] font-mono font-bold text-[#15803D] uppercase tracking-widest shadow-xs">
        <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />
        <span>Ren • YR Mascot</span>
      </div>
    </div>
  );
}
