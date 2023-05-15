import { Router } from "express";
import viewsRouter from "./views/index.js";

const router = Router();

router.use("/", viewsRouter);

export default router;