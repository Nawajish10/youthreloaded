import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-[var(--radius-md)] border bg-[var(--color-dark-surface)] px-3.5 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-[var(--color-danger)] focus-visible:ring-[var(--color-danger)]"
              : "border-[var(--color-dark-border)] focus-visible:border-[var(--color-primary)] focus-visible:ring-[var(--color-primary)]",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
