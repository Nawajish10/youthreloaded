import * as React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { FormOption } from "@/types";
import { cn } from "@/lib/utils";

export interface FormSelectProps<TFieldValues extends FieldValues>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: Path<TFieldValues>;
  label?: string;
  options: FormOption[];
  placeholder?: string;
  errorMessage?: string;
  register?: UseFormRegister<TFieldValues>;
  required?: boolean;
}

export function FormSelect<TFieldValues extends FieldValues>({
  name,
  label,
  options,
  placeholder = "Select an option",
  errorMessage,
  register,
  required,
  className,
  ...props
}: FormSelectProps<TFieldValues>) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-neutral-200">
          {label} {required && <span className="text-[var(--color-primary)]">*</span>}
        </label>
      )}
      <select
        id={name}
        className={cn(
          "flex h-11 w-full rounded-[var(--radius-md)] border bg-[var(--color-dark-surface)] px-3.5 py-2 text-sm text-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          errorMessage
            ? "border-[var(--color-danger)] focus-visible:ring-[var(--color-danger)]"
            : "border-[var(--color-dark-border)] focus-visible:border-[var(--color-primary)] focus-visible:ring-[var(--color-primary)]",
          className
        )}
        {...(register ? register(name) : {})}
        {...props}
      >
        <option value="" disabled className="bg-neutral-900 text-neutral-500">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            disabled={opt.disabled}
            className="bg-neutral-900 text-neutral-100"
          >
            {opt.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className="text-xs text-[var(--color-danger)] mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
