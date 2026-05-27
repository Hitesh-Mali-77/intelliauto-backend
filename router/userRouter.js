import express from "express";
import {
  checkLoginUser,
  createUser,
  deletUserById,
  getAllUser,
  getCurrentUserById,
  updateUser,
} from "../controller/userController.js";
import { searchCustomers } from "../controller/userController.js";
export const userRouter = express.Router();

import { changePassword } from "../controller/userController.js";
userRouter.put("/changePassword", changePassword);
userRouter.get("/all", getAllUser);
userRouter.get("/current/:id", getCurrentUserById);
userRouter.delete("/delete/:id", deletUserById);
userRouter.post("/create", createUser);
userRouter.put("/update", updateUser);
userRouter.post("/checkLogin", checkLoginUser);
userRouter.get("/search/:search", searchCustomers);
