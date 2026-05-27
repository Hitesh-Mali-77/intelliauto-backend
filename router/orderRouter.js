import express from "express";
import {
  createOrder,
  getAllPendingOrders,
  getInvoicesByCustomerEmail,
  getOrdersByCustomerEmail,
  sellOrder,
} from "../controller/orderController.js";

export const orderRouter = express.Router();

orderRouter.post("/create", createOrder);
orderRouter.get("/pending", getAllPendingOrders);
orderRouter.get("/customer/:email", getOrdersByCustomerEmail);
orderRouter.post("/sell", sellOrder);
orderRouter.get("/invoice/:email", getInvoicesByCustomerEmail);
