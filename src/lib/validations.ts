import { z } from "zod";

/**
 * Standard phone regex validation
 */
const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;

/**
 * Basic lead registration schema placeholder
 */
export const leadRegistrationSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(50, { message: "Full name cannot exceed 50 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(phoneRegex, { message: "Invalid phone number format" }),
  plan: z.string().min(1, { message: "Please select a membership plan" }),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and privacy policy",
  }),
});

export type LeadRegistrationValues = z.infer<typeof leadRegistrationSchema>;

/**
 * Quick contact form schema placeholder
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
