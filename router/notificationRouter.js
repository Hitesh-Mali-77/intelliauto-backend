import express from "express";
import {
  createNotification,
  getAllNotifications,
  getUnreadCount,
  markAsRead,
} from "../controller/notificationController.js";

export const notificationRouter = express.Router();

notificationRouter.post("/create", createNotification);
notificationRouter.get("/all", getAllNotifications);
notificationRouter.put("/read/:id", markAsRead);
notificationRouter.get("/unread", getUnreadCount);
