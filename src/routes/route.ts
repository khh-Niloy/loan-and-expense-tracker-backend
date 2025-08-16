import { Router } from "express";
import { userRoutes } from "../app/modules/user/user.routes";
import { authRoutes } from "../app/modules/auth/auth.routes";
import { loanRoutes } from "../app/modules/loan/loan.routes";
import { expenseRoutes } from "../app/modules/expense/expense.routes";

export const routes = Router();

const allRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/loan",
    route: loanRoutes,
  },
  {
    path: "/expense",
    route: expenseRoutes,
  },
];

allRoutes.forEach(({ path, route }) => routes.use(path, route));