import { z } from "zod";

// export const NotesSchema = z.object({
//   noteMessage: z.string().min(1, "Note message is required"),
//   amount: z.number().nonnegative("Amount must be 0 or greater"),
//   time: z.preprocess((val) => (val ? new Date(val as string) : undefined), z.date()),
// });

export const createLoanSchema = z.object({
  loanTaker_number: z.string().min(1, "Loan taker number is required"),
  loanGiver_number: z.string().min(1, "Loan giver number is required"),
  loanTaker_name: z.string().min(1, "Loan taker name is required"),
  loanGiver_name: z.string().min(1, "Loan giver name is required"),
  amount: z.number().nonnegative("Amount must be 0 or greater"),
  reason: z.string(),
  loanCategory: z.string().optional(),
  ownNotes: z.string().optional(),
  loanPayDate: z.preprocess((val) => (val ? new Date(val as string) : undefined), z.date()).optional(),
});
