import { Router } from "express";
import messagesRouter from "./messages.js";

const router = Router();

router.use("/coder", messagesRouter);

export default router;