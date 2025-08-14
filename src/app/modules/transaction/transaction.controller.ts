import { Request, Response } from "express"
import { transactionServices } from "./transaction.service"
import { successResponse } from "../../utils/successResponse"

const createLoan = async(req: Request, res: Response)=>{
    try {
        const newLoan = await transactionServices.createLoanService(req.body)
        successResponse(res, {
            status: 201,
            message: "new loan created",
            data: newLoan
        })
    } catch (error) {
        res.status(500).json({
            message: (error as Error).message,
        })
    }
}

// const loanList = async(req: Request, res: Response)=>{
//     try {
//         const phoneNumber = req.params.phoneNumber
//         const loanList = await transactionServices.loanListServices(phoneNumber)
//         res.status(201).json({
//             message: "all loan list completed",
//             data: loanList
//         })
//     } catch (error) {
//         res.status(400).json({
//             message: (error as Error).message,
//         })
//     }
// }

// const receivableList = async(req: Request, res: Response)=>{
//     try {
//         const phoneNumber = req.params.phoneNumber
//         const receivableList = await transactionServices.receivableListServices(phoneNumber)
//         res.status(201).json({
//             message: "all receivable list",
//             data: receivableList
//         })
//     } catch (error) {
//         res.status(400).json({
//             message: (error as Error).message,
//         })
//     }
// }

// const updateLoan = async(req: Request, res: Response)=>{
//     try {
//         const transactionId = req.params.transactionId
//         const isFullPay = Boolean(req.query.fullPay)
//         const updateLenden = await transactionServices.updateLoanServices(req.body, transactionId, isFullPay)
//         res.status(201).json({
//             message: "loan updated",
//             data: updateLenden
//         })   
//     } catch (error) {
//         res.status(400).json({
//             message: (error as Error).message,
//         })
//     }
// }

export const transactionController = {
    createLoan,
    // loanList,
    // receivableList,
    // updateLoan
}