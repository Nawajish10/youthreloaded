import * as React from "react";
import { cn } from "@/lib/utils";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
}

export function Stack({
  direction = "column",
  spacing = "md",
  align = "stretch",
  justify = "start",
  className,
  children,
  ...props
}: StackProps) {
  const directionClasses = {
    row: "flex-row",
    column: "flex-col",
  };

  const spacingClasses = {
    xs: "gap-2",
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
  };

  return (
    <div
      className={cn(
        "flex w-full",
        directionClasses[direction],
        spacingClasses[spacing],
        alignClasses[align],
        justifyClasses[justify],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
