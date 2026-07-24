import * as React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { cn } from "@/lib/utils";

export interface FormCheckboxProps<TFieldValues extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: Path<TFieldValues>;
  label: React.ReactNode;
  errorMessage?: string;
  register?: UseFormRegister<TFieldValues>;
}

export function FormCheckbox<TFieldValues extends FieldValues>({
  name,
  label,
  errorMessage,
  register,
  className,
  ...props
}: FormCheckboxProps<TFieldValues>) {
  return (
    <div className="w-full space-y-1">
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          id={name}
          className={cn(
            "h-4 w-4 rounded border-neutral-700 bg-neutral-900 text-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:ring-offset-neutral-900 mt-0.5 transition-colors cursor-pointer",
            errorMessage && "border-red-500",
            className
          )}
          {...(register ? register(name) : {})}
          {...props}
        />
        <span className="text-sm text-neutral-300 group-hover:text-white transition-colors leading-tight">
          {label}
        </span>
      </label>
      {errorMessage && (
        <p className="text-xs text-[var(--color-danger)]">{errorMessage}</p>
      )}
    </div>
  );
}
