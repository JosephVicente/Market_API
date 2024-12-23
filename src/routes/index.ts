import { Router } from "express";
import authRouter from "./Auth/authRoutes";
import userRoutes from "./Users/userRoutes";
import categoryRouter from "./Category/categoryRoutes";
import productRouter from "./Product/productRoutes";
import orderRoutes from "./Orders/orderRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/orders", orderRoutes);

export default router;
