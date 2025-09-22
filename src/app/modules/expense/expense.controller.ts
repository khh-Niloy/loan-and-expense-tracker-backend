import { Request, Response } from "express"
import { successResponse } from "../../utils/successResponse"
import { expenseServices } from "./expense.service"

const createExpense = async(req: Request, res: Response)=>{
    try {
        const newExpense = await expenseServices.createExpenseService(req.body)
        successResponse(res, {
            status: 201,
            message: "new expense created",
            data: newExpense
        })
    } catch (error) {
        res.status(500).json({
            message: (error as Error).message,
        })
    }
}

const expenseList = async(req: Request, res: Response)=>{
    try {
        const phoneNumber = req.params.phoneNumber
        const query = req.query
        const {expenseList, total} = await expenseServices.expenseListServices(phoneNumber, query as Record<string, string>)
        successResponse(res, {
            status: 200,
            message: "retrieve all expenses",
            data: {expenseList, total}
        })
    } catch (error) {
        res.status(400).json({
            message: (error as Error).message,
        })
    }
}

export const expenseController = {
    createExpense,
    expenseList
}