import express from "express";
import productsRouter from "../controllers/Product.controller";
import leadRouter from "../controllers/Lead.controler";
import appConfigRouter from "../controllers/AppConfig.controller";

const router = express.Router();

router.use("/products", productsRouter);
router.use("/", leadRouter);
router.use("/", appConfigRouter);

export default router;