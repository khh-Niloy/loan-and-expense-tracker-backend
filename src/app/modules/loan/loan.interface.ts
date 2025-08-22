export interface ITransactionNotes {
  noteMessage: string;
  amount: number;
  date: Date;
}

export interface IOwnNotes {
  note: string,
  date: Date
}

export interface updateDoc {
  $inc: { amount: number };
  $push?: { transactionNotes: ITransactionNotes };
  $set: { paidAmount: number, remainingAmount: number };
}

export interface ILoan {
  loanTaker_number: string,
  loanGiver_number: string,
  loanTaker_name: string,
  loanGiver_name: string,
  amount: number;
  reason: string;
  transactionNotes?: ITransactionNotes[];
  ownNotes?: IOwnNotes[]  // * need to send notification/email + full conversation 
  loanPayDate?: Date // * need to send phone message or email
  transactionId: string;
  loanCategory?: string;
  paidAmount?: number;
  remainingAmount?: number;
}