import { Transaction } from "./transaction.model";
import { ITransaction, IOwnNotes } from './transaction.interface';
import { getTransactionId } from '../../utils/getTransactionId';

const createLoanService = async(payload: Partial<ITransaction>)=>{

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

    const newLoanInfo = {
        transactionId: createTransactionId,
        ...payload
    }

    console.log(newLoanInfo)

    const newLoan = await Transaction.create(newLoanInfo)
    return newLoan
}

// const loanListServices = async(phoneNumber : string)=>{
//     console.log(phoneNumber)
//     const list = await Payable.find({"loanTaker_Info.phoneNumber": phoneNumber})
//      const total = list.reduce((prev, curr)=> prev + curr.amount, 0)
//     return {list, total}
// }

// const receivableListServices = async(phoneNumber : string)=>{
//     const list = await Payable.find({"loanGiver_Info.phoneNumber": phoneNumber})
//     const total = list.reduce((prev, curr)=> prev + curr.amount, 0)
//     return {list, total}
// }

// const updateLoanServices = async(payload: {amount: number, note: string}, transactionId: string, isFullPay: boolean)=>{
//     const record = await Payable.findOne({transactionId: transactionId})
//     const amount = payload.amount

//     // console.log(payload)
//     // console.log(isFullPay)

//     if(!record){
//         throw new Error("transactionId did not match and transaction not found");
//     }

//     const noteEntry: INote = {
//     noteMessage: isFullPay ? "Full paid" : payload.note || "",
//     amount,
//     time: new Date(),
//   };

//     if(amount > record.amount){
//         throw new Error(`deu loan is ${record.amount}. enter amount less than ${record.amount}`);
//     }

//     const updateDoc: { $inc: { amount: number }; $push?: { notes: INote } } = { $inc: { amount: -amount } };
    
//     updateDoc.$push = {
//         notes: noteEntry
//     }
    
//     const updateLoan = await Payable.findOneAndUpdate({transactionId: transactionId}, updateDoc, {new: true})

//     return updateLoan
// }

export const transactionServices = {
    createLoanService,
    // loanListServices,
    // receivableListServices,
    // updateLoanServices
}