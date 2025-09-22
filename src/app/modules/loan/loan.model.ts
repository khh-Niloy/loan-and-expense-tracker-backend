import { model, Schema } from "mongoose";
import { ITransactionNotes, IOwnNotes, ILoan } from "./loan.interface";

const noteSchema = new Schema<ITransactionNotes>({
  noteMessage: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true }
}, { _id: false });

const ownNoteSchema = new Schema<IOwnNotes>({
  note: { type: String, required: true },
  date: { type: Date, required: true }
}, { _id: false });

const loanSchema = new Schema<ILoan>({
  loanTaker_number: { type: String, required: true },
  loanGiver_number: { type: String, required: true },
  loanTaker_name: { type: String, required: true },
  loanGiver_name: { type: String, required: true },
  amount: { type: Number, required: true },
  reason: { type: String, required: true },
  transactionNotes: { type: [noteSchema], default: [] },
  ownNotes: { type: [ownNoteSchema], default: [] },
  loanPayDate: { type: Date },
  transactionId: { type: String, required: true },
  loanCategory: { type: String },
  paidAmount: { type: Number, default: 0 },
  remainingAmount: { type: Number }
}, { timestamps: true, versionKey: false });

export const Loan = model<ILoan>("Loan", loanSchema);
