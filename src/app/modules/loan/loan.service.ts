import { ILoan, ITransactionNotes, updateDoc } from './loan.interface';
import { getTransactionId } from '../../utils/getTransactionId';
import { Loan } from './loan.model';

const createLoanService = async(payload: Partial<ILoan>)=>{

    if(!payload.amount){
        throw new Error("please add an amount");
    }

    if(!payload.loanTaker_number){
        throw new Error("please add loan taker phone number");
    }

    if(!payload.loanGiver_name){
        throw new Error("please add loan giver name");
    }

    if(!payload.loanGiver_number){
        throw new Error("please add loan giver phone number");
    }

    const createTransactionId = getTransactionId()

    if(payload.ownNotes){
        payload.ownNotes = [{
            note: payload.ownNotes as unknown as string,
            date: new Date()
        }];
    }

    payload.loanCategory ? payload.loanCategory : "others"

    const newLoanInfo = {
        transactionId: createTransactionId,
        ...payload
    }

    const newLoan = await Loan.create(newLoanInfo)
    return newLoan
}

const loanListServices = async(phoneNumber : string, query: Record<string, string>)=>{
    const filter = query
    const searchValue = query.searchTerm || ""
    const searchArr = ["loanGiver_number", "loanGiver_name", "reason", "loanCategory"]

    const search = {
        $or: searchArr.map(field=> ({
            [field]: { $regex: searchValue, $options: "i" }
        }))
    }

    const loanList = await Loan.find({loanTaker_number: phoneNumber}).find(filter).find(search)
    const total = loanList.reduce((prev, curr)=> prev + curr.amount, 0)
    return {loanList, total}
}

const receivableListServices = async(phoneNumber : string)=>{
    const receivableList = await Loan.find({loanGiver_number: phoneNumber})
    const total = receivableList.reduce((prev, curr)=> prev + curr.amount, 0)
    return {receivableList, total}
}

const updateLoanServices = async(payload: {amount: number, note: string}, transactionId: string, isFullPay: boolean)=>{
    const loanRecord = await Loan.findOne({transactionId: transactionId})
    const amount = payload.amount

    if(!loanRecord){
        throw new Error("transactionId did not match and transaction not found");
    }

    const noteEntry: ITransactionNotes = {
    noteMessage: isFullPay ? "Full paid" : payload.note || "",
    amount,
    date: new Date(),
    };

    if(amount > loanRecord.amount){
        throw new Error(`deu loan is ${loanRecord.amount}. enter amount less than       
        ${loanRecord.amount}`);
    }

    let paidAmount = 0
    let remainingAmount = 0

    if(isFullPay){
        paidAmount = loanRecord.amount
        remainingAmount = 0
    }
    paidAmount = loanRecord.paidAmount || 0 + amount
    remainingAmount = loanRecord.amount - paidAmount


    const updateDoc: updateDoc = 
     { $inc: { amount: -amount }, $set: { paidAmount: paidAmount, remainingAmount: remainingAmount } 
    };
    
    updateDoc.$push = {
        transactionNotes : noteEntry
    }
    
    const updateLoan = await Loan.findOneAndUpdate({transactionId: transactionId}, updateDoc, {new: 
         true})

    return updateLoan
}

export const loanServices = {
    createLoanService,
    loanListServices,
    receivableListServices,
    updateLoanServices
}