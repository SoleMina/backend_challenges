import { Router } from "express";
import isAdmin from "../../middlewares/isAdmin.js";

const router = Router();

router.get("/", isAdmin, (req, res, next) => {
  try {
    return res.render("register", {
      title: "register",
      styles: "css/styles.css",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
