import { Request, Response } from "express";
import { statsService } from "./stats.service";
import { successResponse } from "../../utils/successResponse";

export const statsController = {
  getCategoryLoanStats: async (req: Request, res: Response) => {
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
  },
};
