import { Router } from "express";
import { userRoutes } from "../app/modules/user/user.routes";
import { transactionRoutes } from "../app/modules/transaction/transaction.routes";
import { authRoutes } from "../app/modules/auth/auth.routes";

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
    path: "/transaction",
    route: transactionRoutes,
  },
];

allRoutes.forEach(({ path, route }) => routes.use(path, route));