import { Router } from "express";
import { statsController } from "./stats.controller";

export const statsRoutes = Router();

// GET /stats/category-loan/:phoneNumber
statsRoutes.get("/loan-stats/:phoneNumber", statsController.getCategoryLoanStats);