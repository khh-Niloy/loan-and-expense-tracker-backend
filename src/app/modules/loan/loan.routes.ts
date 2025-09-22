import { Router } from "express";
import { loanController } from "./loan.controller";
import { zodValidate } from "../../middleware/zodValidate";
import { createLoanSchema } from "./loan.validation";
import { checkAuth } from "../../middleware/checkAuth";

export const loanRoutes = Router()

loanRoutes.post("/create-loan", checkAuth(), zodValidate(createLoanSchema), loanController.createLoan)

loanRoutes.get("/loan-list/:phoneNumber", checkAuth(), loanController.loanList)

loanRoutes.get("/receivable-list/:phoneNumber", checkAuth(), loanController.receivableList)

loanRoutes.patch("/update-loan/:transactionId", checkAuth(), loanController.updateLoan)
