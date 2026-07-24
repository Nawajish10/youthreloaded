import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface FormOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface BaseFormFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label?: string;
  helperText?: string;
  error?: FieldError;
  register?: UseFormRegister<TFieldValues>;
  required?: boolean;
}
