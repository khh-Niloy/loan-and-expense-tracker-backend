import { Request, Response } from "express";
import { statsService } from "./stats.service";
import { successResponse } from "../../utils/successResponse";

const getCategoryLoanStats = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.params;
    const categoryLoanList = await statsService.categoryWithUserLoanList(phoneNumber);
    successResponse(res, {
      status: 200,
      message: "Category loan list fetched successfully",
      data: categoryLoanList,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

const getExpenseStats = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.params;
    const expenseStats = await statsService.expenseStatsService(phoneNumber);
    successResponse(res, {
      status: 200,
      message: "Expense stats fetched successfully",
      data: expenseStats,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export const statsController = {
  getCategoryLoanStats,
  getExpenseStats
};


