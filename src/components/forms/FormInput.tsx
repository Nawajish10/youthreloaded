import * as React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Input, InputProps } from "@/components/ui/Input";

export interface FormInputProps<TFieldValues extends FieldValues>
  extends Omit<InputProps, "name"> {
  name: Path<TFieldValues>;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  register?: UseFormRegister<TFieldValues>;
  required?: boolean;
}

export function FormInput<TFieldValues extends FieldValues>({
  name,
  label,
  helperText,
  errorMessage,
  register,
  required,
  className,
  ...props
}: FormInputProps<TFieldValues>) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-neutral-200">
          {label} {required && <span className="text-[var(--color-primary)]">*</span>}
        </label>
      )}
      <Input
        id={name}
        error={!!errorMessage}
        className={className}
        {...(register ? register(name) : {})}
        {...props}
      />
      {errorMessage ? (
        <p className="text-xs text-[var(--color-danger)] mt-1">{errorMessage}</p>
      ) : helperText ? (
        <p className="text-xs text-neutral-400 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
}
