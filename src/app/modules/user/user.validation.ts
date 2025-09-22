import { z } from "zod";

const nameSchema = z
  .string()
  .min(1, "Name is required")
  .min(2, "Name must be at least 2 characters long")
  .max(50, "Name cannot exceed 50 characters")
  .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes");

const emailSchema = z
  .email("Please provide a valid email address")
  .min(1, "Email is required")
  .max(100, "Email cannot exceed 100 characters")
  .transform(val => val.toLowerCase());

const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(5, "Password must be at least 5 characters long")
  .max(100, "Password cannot exceed 100 characters")
  .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    })

const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .regex(/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number (E.164 format recommended)");

export const userCreateZodSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  phoneNumber: phoneSchema
});

// export const userUpdateZodSchema = z.object({
//   name: nameSchema.optional(),
//   email: emailSchema.optional(),
//   phoneNumber: phoneSchema.optional(),
//   address: z
//     .string()
//     .max(200, "Address cannot exceed 200 characters")
//     .optional(),
//   isActive: z.boolean().optional(),
//   isVerified: z.boolean().optional()
// }).strict();