"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  MessageCircle,
  Dumbbell,
  Zap,
  Target,
  Sun,
  Sunrise,
  Moon,
  Clock,
  RotateCcw,
  Sparkles,
  User,
  Smartphone,
  Flame,
} from "lucide-react";
import { MascotAvatar, MascotPose } from "@/components/mascot/MascotAvatar";

// Form Schema for all 8 Steps
const onboardingSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  mobile: z
    .string()
    .min(10, "Valid 10-digit mobile number required")
    .regex(/^[0-9+\s-]{10,15}$/, "Invalid phone number format"),
  age: z.string().min(1, "Select or enter your age"),
  gender: z.string().min(1, "Please select your gender"),
  fitnessGoal: z.string().min(1, "Please select a fitness goal"),
  preferredTime: z.string().min(1, "Please select a preferred workout time"),
  membershipPlan: z.string().min(1, "Please select a membership plan"),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted",
  }),
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

const TOTAL_STEPS = 8;

export function RegistrationFormSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regId, setRegId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [hasError, setHasError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      age: "18_25",
      gender: "male",
      fitnessGoal: "weight_loss",
      preferredTime: "morning",
      membershipPlan: "3_months",
      email: "",
      agreeToTerms: true,
    },
  });

  const formValues = watch();

  // Focus active input on step change without scrolling page down on initial load
  useEffect(() => {
    if (currentStep > 1 && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
    setHasError(false);
  }, [currentStep]);

  // Determine Mascot Pose per Step
  const getMascotPose = (): MascotPose => {
    switch (currentStep) {
      case 1:
        return "waving";
      case 2:
        return "phone";
      case 3:
        return "pointing_age";
      case 4:
        return "measuring";
      case 5:
        return "lifting";
      case 6:
        return "flexing";
      case 7:
        return "membership";
      case 8:
        return "thumbsup";
      default:
        return "waving";
    }
  };

  // Handle Step Validation and Advancement
  const handleNextStep = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger("fullName");
    } else if (currentStep === 2) {
      isValid = await trigger("mobile");
    } else if (currentStep === 3) {
      isValid = await trigger("age");
    } else if (currentStep === 4) {
      isValid = await trigger("gender");
    } else if (currentStep === 5) {
      isValid = await trigger("fitnessGoal");
    } else if (currentStep === 6) {
      isValid = await trigger("preferredTime");
    } else if (currentStep === 7) {
      isValid = await trigger("membershipPlan");
    }

    if (isValid && currentStep < TOTAL_STEPS) {
      setHasError(false);
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else if (!isValid) {
      setHasError(true);
      setTimeout(() => setHasError(false), 2000);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Keyboard "Enter" key handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentStep < TOTAL_STEPS) {
        handleNextStep();
      }
    }
  };

  // Final Form Submission (Instant UX flow + Confetti burst)
  const onSubmit = async (data: OnboardingValues) => {
    if (loading) return;

    let showSpinnerTimer: NodeJS.Timeout | null = null;
    let isFinished = false;

    showSpinnerTimer = setTimeout(() => {
      if (!isFinished) {
        setLoading(true);
      }
    }, 300);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      isFinished = true;
      if (showSpinnerTimer) clearTimeout(showSpinnerTimer);

      if (result.success) {
        setRegId(result.registrationId);
        setSubmitted(true);

        // Fire Confetti animation 🎉
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#22C55E", "#15803D", "#F59E0B", "#3B82F6"],
          });
        } catch (e) {
          console.log("Confetti error:", e);
        }
      } else {
        setHasError(true);
        alert("Registration error: " + (result.message || "Please check details"));
      }
    } catch (err) {
      isFinished = true;
      if (showSpinnerTimer) clearTimeout(showSpinnerTimer);
      setHasError(true);
      console.error("Submission error:", err);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = Math.round((currentStep / TOTAL_STEPS) * 100);

  // Animation variants
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 30 : -30,
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8FAF8] relative overflow-hidden" id="register">
      {/* Organic Background Motion Elements */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#22C55E]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Registration Card Container (Glassmorphism + 32px rounded corners) */}
        <div className="w-full rounded-[32px] bg-white/90 border border-[#22C55E]/20 p-6 sm:p-10 shadow-[0_20px_60px_rgba(34,197,94,0.08)] backdrop-blur-xl relative min-h-[560px] flex flex-col justify-between">
          {!submitted ? (
            <>
              {/* Progress Bar & Header */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider">
                  <span className="text-[#15803D] flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#22C55E]" />
                    <span>Step {currentStep} of {TOTAL_STEPS}</span>
                  </span>
                  <span className="text-[#64748B]">{progressPercentage}% Complete</span>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full h-2.5 rounded-full bg-[#E2E8F0] overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#15803D] to-[#22C55E] rounded-full shadow-xs"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Anime Mascot Assistant Section (Centered above question) */}
              <div className="py-2 flex flex-col items-center justify-center">
                <MascotAvatar
                  pose={getMascotPose()}
                  step={currentStep}
                  isTyping={isTyping}
                  hasError={hasError}
                  isSuccess={submitted}
                />
              </div>

              {/* Form Content / Cards */}
              <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} className="flex-1 flex flex-col justify-between">
                <div className="relative overflow-hidden py-2 my-auto">
                  <AnimatePresence custom={direction} mode="wait">
                    {/* STEP 1: Full Name 👋 */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="space-y-4 text-center"
                      >
                        <div>
                          <h3 className="font-headline-lg text-2xl sm:text-3xl font-black uppercase text-[#0F172A] tracking-tight leading-tight">
                            Hi there! What&apos;s your <span className="text-[#22C55E]">full name?</span>
                          </h3>
                          <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 max-w-md mx-auto">
                            I&apos;m Ren, your fitness mascot! Let&apos;s personalize your membership pass.
                          </p>
                        </div>

                        <div className="pt-2 max-w-md mx-auto relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#22C55E]">
                            <User className="h-5 w-5" />
                          </div>
                          <input
                            {...register("fullName")}
                            ref={(e) => {
                              register("fullName").ref(e);
                              inputRef.current = e;
                            }}
                            onFocus={() => setIsTyping(true)}
                            onBlur={() => setIsTyping(false)}
                            placeholder="John Doe"
                            className="w-full h-14 rounded-2xl bg-white border border-[#E2E8F0] pl-12 pr-5 text-base sm:text-lg text-[#0F172A] placeholder-slate-400 focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/15 focus:outline-none transition-all shadow-xs"
                          />
                          {errors.fullName && (
                            <p className="text-xs text-red-500 mt-2 font-medium">{errors.fullName.message}</p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Mobile Number 📱 */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="space-y-4 text-center"
                      >
                        <div>
                          <h3 className="font-headline-lg text-2xl sm:text-3xl font-black uppercase text-[#0F172A] tracking-tight leading-tight">
                            Great! What&apos;s your <span className="text-[#22C55E]">mobile number?</span>
                          </h3>
                          <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 max-w-md mx-auto">
                            Our team will call or WhatsApp you within 30 mins to confirm your pass.
                          </p>
                        </div>

                        <div className="pt-2 max-w-md mx-auto relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#22C55E]">
                            <Smartphone className="h-5 w-5" />
                          </div>
                          <input
                            {...register("mobile")}
                            ref={(e) => {
                              register("mobile").ref(e);
                              inputRef.current = e;
                            }}
                            onFocus={() => setIsTyping(true)}
                            onBlur={() => setIsTyping(false)}
                            type="tel"
                            placeholder="+91 98765 43210"
                            className="w-full h-14 rounded-2xl bg-white border border-[#E2E8F0] pl-12 pr-5 text-base sm:text-lg text-[#0F172A] placeholder-slate-400 focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/15 focus:outline-none transition-all font-mono shadow-xs"
                          />
                          {errors.mobile && (
                            <p className="text-xs text-red-500 mt-2 font-medium">{errors.mobile.message}</p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Age Group 🎂 */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="space-y-4 text-center"
                      >
                        <div>
                          <h3 className="font-headline-lg text-2xl sm:text-3xl font-black uppercase text-[#0F172A] tracking-tight leading-tight">
                            Select your <span className="text-[#22C55E]">age group</span>
                          </h3>
                          <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 max-w-md mx-auto">
                            Helps us customize workout intensity & safety guidelines.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-md mx-auto">
                          {[
                            { label: "Under 18", val: "under_18" },
                            { label: "18 - 25 Years", val: "18_25" },
                            { label: "26 - 35 Years", val: "26_35" },
                            { label: "36 - 50 Years", val: "36_50" },
                            { label: "50+ Years", val: "50_plus" },
                          ].map((item) => {
                            const isSelected = formValues.age === item.val;
                            return (
                              <button
                                type="button"
                                key={item.val}
                                onClick={() => setValue("age", item.val, { shouldValidate: true })}
                                className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold text-center transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#22C55E] border-[#22C55E] text-white shadow-md scale-[1.02]"
                                    : "bg-white border-[#E2E8F0] text-[#0F172A] hover:border-[#22C55E]"
                                }`}
                              >
                                {item.label}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 4: Gender 📏 */}
                    {currentStep === 4 && (
                      <motion.div
                        key="step4"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="space-y-4 text-center"
                      >
                        <div>
                          <h3 className="font-headline-lg text-2xl sm:text-3xl font-black uppercase text-[#0F172A] tracking-tight leading-tight">
                            Select your <span className="text-[#22C55E]">gender</span>
                          </h3>
                          <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 max-w-md mx-auto">
                            Used for locker room access & specialized training routines.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-md mx-auto">
                          {[
                            { label: "Male", val: "male", icon: "🏃‍♂️" },
                            { label: "Female", val: "female", icon: "🏃‍♀️" },
                            { label: "Other", val: "other", icon: "✨" },
                          ].map((item) => {
                            const isSelected = formValues.gender === item.val;
                            return (
                              <button
                                type="button"
                                key={item.val}
                                onClick={() => {
                                  setValue("gender", item.val, { shouldValidate: true });
                                  handleNextStep();
                                }}
                                className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#22C55E]/10 border-[#22C55E] text-[#15803D] shadow-md scale-[1.02]"
                                    : "bg-white border-[#E2E8F0] text-[#0F172A] hover:border-[#22C55E]"
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <span className="text-xl">{item.icon}</span>
                                  <span className="font-bold text-sm uppercase">{item.label}</span>
                                </div>
                                <div
                                  className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                                    isSelected ? "border-[#22C55E] bg-[#22C55E]" : "border-slate-300"
                                  }`}
                                >
                                  {isSelected && <CheckCircle2 className="h-3 w-3 text-white" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 5: Fitness Goal 💪 */}
                    {currentStep === 5 && (
                      <motion.div
                        key="step5"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="space-y-4 text-center"
                      >
                        <div>
                          <h3 className="font-headline-lg text-2xl sm:text-3xl font-black uppercase text-[#0F172A] tracking-tight leading-tight">
                            What&apos;s your main <span className="text-[#22C55E]">fitness goal?</span>
                          </h3>
                          <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 max-w-md mx-auto">
                            Choose what you want to achieve at Youth Gym Reloaded.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2 max-w-md mx-auto">
                          {[
                            { label: "Weight Loss", desc: "Burn fat & lean out", val: "weight_loss", icon: Flame },
                            { label: "Muscle Gain", desc: "Build size & power", val: "muscle_gain", icon: Dumbbell },
                            { label: "Strength", desc: "Heavy powerlifting", val: "strength", icon: Zap },
                            { label: "General Fitness", desc: "Overall health", val: "general", icon: Target },
                          ].map((item) => {
                            const Icon = item.icon;
                            const isSelected = formValues.fitnessGoal === item.val;
                            return (
                              <button
                                type="button"
                                key={item.val}
                                onClick={() => {
                                  setValue("fitnessGoal", item.val, { shouldValidate: true });
                                }}
                                className={`p-3.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#22C55E]/10 border-[#22C55E] text-[#15803D] shadow-md scale-[1.02]"
                                    : "bg-white border-[#E2E8F0] text-[#0F172A] hover:border-[#22C55E]"
                                }`}
                              >
                                <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? "bg-[#22C55E] text-white" : "bg-[#F1F5F9] text-[#22C55E]"}`}>
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div className="truncate">
                                  <div className="font-bold text-xs uppercase text-[#0F172A] truncate">{item.label}</div>
                                  <div className="text-[10px] text-[#64748B] truncate">{item.desc}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 6: Preferred Workout Time 🔥 */}
                    {currentStep === 6 && (
                      <motion.div
                        key="step6"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="space-y-4 text-center"
                      >
                        <div>
                          <h3 className="font-headline-lg text-2xl sm:text-3xl font-black uppercase text-[#0F172A] tracking-tight leading-tight">
                            When do you prefer to <span className="text-[#22C55E]">work out?</span>
                          </h3>
                          <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 max-w-md mx-auto">
                            Pick your favorite training time slot.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2 max-w-md mx-auto">
                          {[
                            { label: "Morning", timing: "5AM - 10AM", val: "morning", icon: Sunrise },
                            { label: "Afternoon", timing: "10AM - 4PM", val: "afternoon", icon: Sun },
                            { label: "Evening", timing: "4PM - 11PM", val: "evening", icon: Moon },
                            { label: "Flexible", timing: "Anytime", val: "flexible", icon: Clock },
                          ].map((item) => {
                            const Icon = item.icon;
                            const isSelected = formValues.preferredTime === item.val;
                            return (
                              <button
                                type="button"
                                key={item.val}
                                onClick={() => {
                                  setValue("preferredTime", item.val, { shouldValidate: true });
                                }}
                                className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#22C55E]/10 border-[#22C55E] text-[#15803D] shadow-md scale-[1.02]"
                                    : "bg-white border-[#E2E8F0] text-[#0F172A] hover:border-[#22C55E]"
                                }`}
                              >
                                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? "bg-[#22C55E] text-white" : "bg-[#F1F5F9] text-[#22C55E]"}`}>
                                  <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <div className="font-bold text-xs uppercase text-[#0F172A]">{item.label}</div>
                                  <div className="text-[10px] text-[#64748B] font-mono">{item.timing}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 7: Membership Plan 👉 */}
                    {currentStep === 7 && (
                      <motion.div
                        key="step7"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="space-y-4 text-center"
                      >
                        <div>
                          <h3 className="font-headline-lg text-2xl sm:text-3xl font-black uppercase text-[#0F172A] tracking-tight leading-tight">
                            Which plan fits your <span className="text-[#22C55E]">budget?</span>
                          </h3>
                          <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 max-w-md mx-auto">
                            Lock in your special registration offer.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2 max-w-md mx-auto">
                          {[
                            { label: "Monthly", price: "₹800/mo", sub: "+ Registration Fee", val: "1_month" },
                            { label: "3 Months", price: "₹2200 Total", sub: "Reg. FREE ⭐", val: "3_months" },
                            { label: "6 Months", price: "₹4000 Total", sub: "Reg. FREE ⭐", val: "6_months" },
                            { label: "1 Year", price: "₹6000 Total", sub: "Reg. FREE 👑", val: "12_months" },
                          ].map((item) => {
                            const isSelected = formValues.membershipPlan === item.val;
                            return (
                              <button
                                type="button"
                                key={item.val}
                                onClick={() => {
                                  setValue("membershipPlan", item.val, { shouldValidate: true });
                                }}
                                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#22C55E]/10 border-[#22C55E] text-[#15803D] shadow-md scale-[1.02]"
                                    : "bg-white border-[#E2E8F0] text-[#0F172A] hover:border-[#22C55E]"
                                }`}
                              >
                                <div className="font-bold text-xs uppercase text-[#0F172A]">{item.label}</div>
                                <div className="text-base font-black text-[#22C55E] mt-0.5">{item.price}</div>
                                <div className="text-[10px] text-[#64748B] font-mono mt-0.5">{item.sub}</div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 8: Final Step 🎉 */}
                    {currentStep === 8 && (
                      <motion.div
                        key="step8"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="space-y-4 text-center"
                      >
                        <div>
                          <h3 className="font-headline-lg text-2xl sm:text-3xl font-black uppercase text-[#0F172A] tracking-tight leading-tight">
                            Almost done! <span className="text-[#22C55E]">Confirm your pass</span>
                          </h3>
                          <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 max-w-md mx-auto">
                            Provide an optional email for your digital membership pass & confirmation.
                          </p>
                        </div>

                        <div className="space-y-3 pt-2 max-w-md mx-auto">
                          <div>
                            <input
                              {...register("email")}
                              ref={(e) => {
                                register("email").ref(e);
                                inputRef.current = e;
                              }}
                              onFocus={() => setIsTyping(true)}
                              onBlur={() => setIsTyping(false)}
                              type="email"
                              placeholder="john@example.com (Optional)"
                              className="w-full h-14 rounded-2xl bg-white border border-[#E2E8F0] px-5 text-sm text-[#0F172A] placeholder-slate-400 focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/15 focus:outline-none transition-all shadow-xs"
                            />
                            {errors.email && (
                              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                            )}
                          </div>

                          <div className="pt-1 text-left">
                            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#0F172A]">
                              <input
                                type="checkbox"
                                {...register("agreeToTerms")}
                                className="mt-0.5 rounded border-slate-300 bg-white text-[#22C55E] focus:ring-[#22C55E] h-4 w-4"
                              />
                              <span className="leading-snug">
                                I agree to be contacted regarding my gym visit & membership.
                              </span>
                            </label>
                            {errors.agreeToTerms && (
                              <p className="text-xs text-red-500 mt-1 font-medium">{errors.agreeToTerms.message}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer Controls (Back & Continue / Submit Buttons) */}
                <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-between gap-4 mt-4">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-3 rounded-full border border-[#E2E8F0] text-[#0F172A] hover:border-[#22C55E] hover:text-[#15803D] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < TOTAL_STEPS ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={handleNextStep}
                      className="px-8 py-3.5 rounded-full bg-[#22C55E] text-white text-xs font-black uppercase tracking-widest hover:bg-[#16A34A] transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={loading}
                      className="px-8 py-4 rounded-full bg-[#22C55E] text-white text-xs font-black uppercase tracking-widest hover:bg-[#16A34A] transition-all shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>{loading ? "SUBMITTING..." : "SUBMIT REGISTRATION"}</span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  )}
                </div>
              </form>
            </>
          ) : (
            /* SUCCESS SCREEN 🎉 */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="py-8 text-center flex flex-col items-center justify-center space-y-5 my-auto"
            >
              <MascotAvatar pose="celebrate" isSuccess={true} />

              <div>
                <h4 className="font-headline-lg text-2xl sm:text-3xl font-black uppercase text-[#0F172A] tracking-tight">
                  🎉 Registration <span className="text-[#22C55E]">Submitted Successfully!</span>
                </h4>
                {regId && (
                  <div className="inline-block mt-2 bg-[#22C55E]/10 border border-[#22C55E]/30 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#15803D] shadow-xs">
                    PASS ID: {regId}
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#64748B] max-w-md leading-relaxed">
                Thank you! Ren and our fitness advisors will contact you within 30 minutes to confirm your visit.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                <a
                  href="tel:+917074975231"
                  className="w-full sm:flex-1 py-3.5 bg-[#22C55E] text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#16A34A] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Now</span>
                </a>

                <a
                  href="https://wa.me/917479207804?text=Hi%20Youth%20Gym%20Reloaded!%20I%20just%20submitted%20my%20registration."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3.5 bg-[#25D366]/10 border border-[#25D366]/40 text-[#25D366] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setCurrentStep(1);
                  reset();
                }}
                className="text-xs text-[#15803D] font-bold uppercase underline pt-2 cursor-pointer hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Register Another Member</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
