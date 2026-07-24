"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: "left" | "right";
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = "right",
  className,
}: DrawerProps) {
  useLockBodyScroll(isOpen);

  const variants = {
    left: { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } },
    right: { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          <motion.div
            initial={variants[position].initial}
            animate={variants[position].animate}
            exit={variants[position].exit}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "relative z-10 flex h-full w-full max-w-md flex-col bg-[var(--color-dark-surface)] border-neutral-800 p-6 shadow-2xl text-white",
              position === "left" ? "mr-auto border-r" : "ml-auto border-l",
              className
            )}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
              {title && <h3 className="text-xl font-bold">{title}</h3>}
              <button
                onClick={onClose}
                className="ml-auto p-1.5 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
