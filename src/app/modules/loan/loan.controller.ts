import { Request, Response } from "express"
import { loanServices } from "./loan.service"
import { successResponse } from "../../utils/successResponse"

const createLoan = async(req: Request, res: Response)=>{
    try {
        const newLoan = await loanServices.createLoanService(req.body)
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

const loanList = async(req: Request, res: Response)=>{
    try {
        const phoneNumber = req.params.phoneNumber
        const query = req.query
        const {loanList, total} = await loanServices.loanListServices(phoneNumber, query as Record<string, string>)
        successResponse(res, {
            status: 200,
            message: "retreive all loan",
            data: {loanList, total}
        })
    } catch (error) {
        res.status(400).json({
            message: (error as Error).message,
        })
    }
}

const receivableList = async(req: Request, res: Response)=>{
    try {
        const phoneNumber = req.params.phoneNumber
        const {receivableList, total} = await loanServices.receivableListServices(phoneNumber)
        successResponse(res, {
            status: 200,
            message: "retreive all receivable list",
            data: {receivableList, total}
        })
        res.status(201).json({
            message: "all receivable list",
            data: receivableList
        })
    } catch (error) {
        res.status(400).json({
            message: (error as Error).message,
        })
    }
}

const updateLoan = async(req: Request, res: Response)=>{
    try {
        const transactionId = req.params.transactionId
        const isFullPay = Boolean(req.query.fullPay)
        const updateLenden = await loanServices.updateLoanServices(req.body, transactionId, isFullPay)
        res.status(201).json({
            message: "loan updated",
            data: updateLenden
        })   
    } catch (error) {
        res.status(400).json({
            message: (error as Error).message,
        })
    }
}

export const loanController = {
    createLoan,
    loanList,
    receivableList,
    updateLoan
}