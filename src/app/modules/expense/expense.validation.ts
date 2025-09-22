import { z } from "zod";

export const createExpenseSchema = z.object({
  amount: z.number().nonnegative("Amount must be 0 or greater"),
  phoneNumber: z.string(),
  reason: z.string().optional(),
  note: z.string().optional(),
  date: z.preprocess((val) => (val ? new Date(val as string) : undefined), z.date()).optional(),
  expenseCategory: z.string().optional(),
});

export const updateExpenseSchema = z.object({
  amount: z.number().nonnegative("Amount must be 0 or greater"),
  reason: z.string(),
  note: z.string(),
  date: z.preprocess((val) => (val ? new Date(val as string) : undefined), z.date()),
  expenseCategory: z.string(),
}).optional()
