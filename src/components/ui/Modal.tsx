"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  useLockBodyScroll(isOpen);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "relative z-10 w-full max-w-lg rounded-2xl border border-neutral-800 bg-[var(--color-dark-surface)] p-6 shadow-2xl text-white",
              className
            )}
          >
            <div className="flex items-center justify-between mb-4">
              {title && <h3 className="text-xl font-bold text-white">{title}</h3>}
              <button
                onClick={onClose}
                className="ml-auto rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
