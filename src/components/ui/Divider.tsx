import * as React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: string;
}

export function Divider({
  orientation = "horizontal",
  label,
  className,
  ...props
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={cn("h-full w-[1px] bg-neutral-800 self-stretch", className)}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div className={cn("relative flex items-center w-full my-6", className)} {...props}>
        <div className="flex-grow border-t border-neutral-800" />
        <span className="px-3 text-xs uppercase tracking-wider text-neutral-500 font-medium">
          {label}
        </span>
        <div className="flex-grow border-t border-neutral-800" />
      </div>
    );
  }

  return (
    <hr
      className={cn("w-full border-t border-neutral-800 my-6", className)}
      {...props}
    />
  );
}
