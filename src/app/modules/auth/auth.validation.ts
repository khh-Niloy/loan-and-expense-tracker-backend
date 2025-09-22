import z from "zod";

export const authLoginSchema = z.object({
  email: z.email().optional(),
  phoneNumber: z.string().optional(),
  password: z.string().min(5)
}).refine(data => data.email || data.phoneNumber, {
  message: "Either email or number must be provided"
});
