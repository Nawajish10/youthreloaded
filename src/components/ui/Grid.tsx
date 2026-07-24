import * as React from "react";
import { cn } from "@/lib/utils";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "sm" | "md" | "lg" | "xl";
}

export function Grid({
  cols = 3,
  gap = "md",
  className,
  children,
  ...props
}: GridProps) {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  };

  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-10",
  };

  return (
    <div
      className={cn("grid w-full", colClasses[cols], gapClasses[gap], className)}
      {...props}
    >
      {children}
    </div>
  );
}
