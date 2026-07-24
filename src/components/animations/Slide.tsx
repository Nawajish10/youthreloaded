"use client";

import { motion } from "framer-motion";
import * as React from "react";

export interface SlideProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export function Slide({
  children,
  direction = "left",
  delay = 0,
  duration = 0.5,
  distance = 50,
  className,
}: SlideProps) {
  const directions = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: [0.25, 1, 0.5, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
