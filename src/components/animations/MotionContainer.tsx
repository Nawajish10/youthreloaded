"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import * as React from "react";

export type MotionContainerProps = HTMLMotionProps<"div">;

export function MotionContainer({ children, ...props }: MotionContainerProps) {
  return <motion.div {...props}>{children}</motion.div>;
}
