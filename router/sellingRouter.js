import express from "express";
// import {
//   createSelling,
//   getAllSelling,
//   getSellingByEmployeeId,
// } from "../controller/sellingController.js";
// import {
//   createSelling,
//   getAllSelling,
//   getSellingByEmployeeId,
//   getStockPrediction,
// } from "../controller/sellingController.js";

import {
  createSelling,
  getAllSelling,
  getSellingByEmployeeId,
  getStockPrediction,
  deleteStockPrediction,
} from "../controller/sellingController.js";
export const sellingRouter = express.Router();

sellingRouter.get("/all", getAllSelling);
sellingRouter.post("/create", createSelling);
sellingRouter.get("/employee/:id", getSellingByEmployeeId);
sellingRouter.get("/stock-prediction", getStockPrediction);
sellingRouter.delete("/stock-prediction/:id", deleteStockPrediction);
