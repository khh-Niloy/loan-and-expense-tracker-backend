import { model, Schema } from "mongoose";
import { IExpense } from "./expense.interface";

const expenseSchema = new Schema<IExpense>({
  amount: { type: Number, required: true },
  reason: { type: String, required: true },
  note: { type: String },
  date: { type: Date, required: true },
  phoneNumber: {type: String, required: true},
  expenseCategory: { type: String }
}, { timestamps: true, versionKey: false });

export const Expense = model<IExpense>("Expense", expenseSchema);
