import * as React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { FormOption } from "@/types";
import { cn } from "@/lib/utils";

export interface FormRadioProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label?: string;
  options: FormOption[];
  errorMessage?: string;
  register?: UseFormRegister<TFieldValues>;
  required?: boolean;
}

export function FormRadio<TFieldValues extends FieldValues>({
  name,
  label,
  options,
  errorMessage,
  register,
  required,
}: FormRadioProps<TFieldValues>) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <span className="block text-sm font-medium text-neutral-200">
          {label} {required && <span className="text-[var(--color-primary)]">*</span>}
        </span>
      )}
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              value={opt.value}
              disabled={opt.disabled}
              className={cn(
                "h-4 w-4 border-neutral-700 bg-neutral-900 text-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:ring-offset-neutral-900 transition-colors cursor-pointer",
                errorMessage && "border-red-500"
              )}
              {...(register ? register(name) : {})}
            />
            <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">
              {opt.label}
            </span>
          </label>
        ))}
      </div>
      {errorMessage && (
        <p className="text-xs text-[var(--color-danger)] mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
