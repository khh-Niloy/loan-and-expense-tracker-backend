import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { zodValidate } from "../../middleware/zodValidate";
import { createExpenseSchema } from "./expense.validation";
import { expenseController } from "./expense.controller";

export const expenseRoutes = Router()

expenseRoutes.post("/create-expense", checkAuth(), zodValidate(createExpenseSchema), expenseController.createExpense)

expenseRoutes.get("/expense-list/:phoneNumber", checkAuth(), expenseController.expenseList)