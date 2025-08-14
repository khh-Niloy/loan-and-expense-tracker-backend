import { Router } from "express";
import { userRoutes } from "../app/modules/user/user.routes";
import { transactionRoutes } from "../app/modules/transaction/transaction.routes";

export const routes = Router();

const allRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/transaction",
    route: transactionRoutes,
  },
];

allRoutes.forEach(({ path, route }) => routes.use(path, route));