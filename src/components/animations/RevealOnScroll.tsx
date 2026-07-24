"use client";

import { motion, useInView } from "framer-motion";
import * as React from "react";

export interface RevealOnScrollProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
}

export function RevealOnScroll({
  children,
  width = "100%",
  className,
}: RevealOnScrollProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
