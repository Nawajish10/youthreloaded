import * as React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Phone } from "lucide-react";
import { FormInput } from "@/components/forms/FormInput";

export interface FormPhoneInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  register?: UseFormRegister<TFieldValues>;
  required?: boolean;
}

export function FormPhoneInput<TFieldValues extends FieldValues>({
  name,
  label = "Phone Number",
  placeholder = "(555) 000-0000",
  errorMessage,
  register,
  required,
}: FormPhoneInputProps<TFieldValues>) {
  return (
    <FormInput
      name={name}
      type="tel"
      label={label}
      placeholder={placeholder}
      leftIcon={<Phone className="h-4 w-4" />}
      errorMessage={errorMessage}
      register={register}
      required={required}
    />
  );
}
