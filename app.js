import express from "express";
import cors from "cors";
import { accessoryRouter } from "./router/accessoryRouter.js";
import { categoryRouter } from "./router/categoryRouter.js";
import { userRouter } from "./router/userRouter.js";
import { sellingRouter } from "./router/sellingRouter.js";
import { orderRouter } from "./router/orderRouter.js";
import { notificationRouter } from "./router/notificationRouter.js";

const app = express();

const corsOptions = {
  origin: "https://intelliauto-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// ✅ Middleware before routes
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight for all routes
app.use(express.json());

// ✅ Routes
app.use("/notification", notificationRouter);
app.use("/accessory", accessoryRouter);
app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/selling", sellingRouter);
app.use("/order", orderRouter);

// ✅ Listen last
app.listen(8080, () => {
  console.log("Server is running on 8080");
});
