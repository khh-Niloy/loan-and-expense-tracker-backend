import { Router } from "express";
import { transactionController } from "./transaction.controller";
import { zodValidate } from "../../middleware/zodValidate";
import { createTransactionSchema } from "./transaction.validation";
import { checkAuthAndCredits } from "../../middleware/checkAuthAndCredits";

export const transactionRoutes = Router()

transactionRoutes.post("/create-loan", zodValidate(createTransactionSchema), transactionController.createLoan)

// transactionRoutes.get("/loan-list/:phoneNumber", transactionController.loanList)
// transactionRoutes.get("/receivable-list/:phoneNumber", transactionController.receivableList)
// transactionRoutes.patch("/update-loan/:transactionId", transactionController.updateLoan)