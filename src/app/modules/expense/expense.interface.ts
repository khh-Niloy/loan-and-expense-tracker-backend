export interface IExpense {
  amount: number;
  reason: string;
  note?: string,
  date?: Date
  expenseCategory?: string,
  phoneNumber?: string
}