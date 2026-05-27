import express from "express";
import cors from "cors";
import { accessoryRouter } from "./router/accessoryRouter.js";
import { categoryRouter } from "./router/categoryRouter.js";
import { userRouter } from "./router/userRouter.js";
import { sellingRouter } from "./router/sellingRouter.js";
import { orderRouter } from "./router/orderRouter.js";
import { notificationRouter } from "./router/notificationRouter.js";

const app = express();

app.listen(8080, (error, result) => {
  console.log("Server is running on 8080");
});

// app.use(cors());
app.use(
  cors({
    origin: "https://intelliauto-frontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());
app.use("/notification", notificationRouter);
app.use("/accessory", accessoryRouter);
app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/selling", sellingRouter);
app.use("/order", orderRouter);
