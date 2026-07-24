import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-[var(--shadow-glow)] focus-visible:ring-[var(--color-primary)]",
        secondary:
          "bg-[var(--color-secondary)] text-neutral-950 hover:bg-[var(--color-secondary-hover)] focus-visible:ring-[var(--color-secondary)]",
        accent:
          "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] focus-visible:ring-[var(--color-accent)]",
        outline:
          "border border-neutral-700 bg-transparent text-neutral-100 hover:border-neutral-500 hover:bg-neutral-800/50 focus-visible:ring-neutral-400",
        ghost:
          "bg-transparent text-neutral-200 hover:bg-neutral-800/60 hover:text-white focus-visible:ring-neutral-400",
        danger:
          "bg-[var(--color-danger)] text-white hover:bg-red-600 focus-visible:ring-red-500",
      },
      size: {
        sm: "h-9 px-3 text-xs rounded-[var(--radius-md)] gap-1.5",
        md: "h-11 px-5 text-sm rounded-[var(--radius-md)] gap-2",
        lg: "h-13 px-7 text-base rounded-[var(--radius-lg)] gap-2.5",
        icon: "h-10 w-10 rounded-[var(--radius-md)] p-0",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
