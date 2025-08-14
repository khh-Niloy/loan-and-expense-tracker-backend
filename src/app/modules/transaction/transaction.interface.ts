export interface INotes {
  noteMessage: string;
  amount: number;
  date: Date;
}

export interface IOwnNotes {
  note: string,
  date: Date
}

export interface ITransaction {
  loanTaker_number: string,
  loanGiver_number: string,
  loanTaker_name: string,
  loanGiver_name: string,
  amount: number;
  reason: string;
  transactionNotes?: INotes[];
  ownNotes?: IOwnNotes[]  // * need to send notification/email + full conversation 
  loanPayDate?: Date // * need to send phone message or email
  transactionId: string;
  // loanCategory?: string
}