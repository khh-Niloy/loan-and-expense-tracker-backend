import { getTransactionId } from '../../utils/getTransactionId';
import { IExpense } from './expense.interface';
import { Expense } from './expense.model';

const createExpenseService = async(payload: Partial<IExpense>)=>{
    if(!payload.amount){
        throw new Error("please add an amount");
    }

    if(!payload.reason){
        throw new Error("please provide a reason");
    }

    if(!payload.phoneNumber){
        throw new Error("please add phone number");
    }

    const createTransactionId = getTransactionId()

    payload.expenseCategory ? payload.expenseCategory : "others"

    payload.date ? payload.date : new Date()

    const newExpenseObj = {
        transactionId: createTransactionId,
        ...payload
    }

    const newExpense = await Expense.create(newExpenseObj)
    return newExpense
}

const expenseListServices = async(phoneNumber: string, query: Record<string, string>)=>{
    const filter = query
    console.log(phoneNumber)
    const searchValue = query.searchTerm || ""
    const searchArr = ["reason", "expenseCategory"]

    delete filter["searchTerm"]

    const search = {
        $or: searchArr.map(field=> ({
            [field]: { $regex: searchValue, $options: "i" }
        }))
    }

    const expenseList = await Expense.find({phoneNumber: phoneNumber}).find({expenseCategory: query.filter}).find(search)
    // console.log(expenseList)
    const total = expenseList.reduce((prev, curr)=> prev + curr.amount, 0)
    return {expenseList, total}
}

export const expenseServices = {
    createExpenseService,
    expenseListServices
}