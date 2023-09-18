import { Router } from "express";
import User from "../../dao/Mongo/models/User.js";
import { sendMail } from "../../utils/sendMail.js";
import generateToken from "../../utils/generateToken.js";

const router = Router();

router.get("/forgot-password", async (req, res, next) => {
  try {
    return res.render("reset", {
      title: "Reset Password",
      script: "public/js/reset.js",
      styles: "public/css/styles.css",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(email, "insideeee");
    let userDB = await User.findOne({ email });
    console.log(userDB, "userDB");

    if (!userDB) {
      return res.status(500).json({
        success: false,
        message: "Not user found!",
      });
    }
    const user = {
      name: userDB.name,
      email: userDB.email,
      role: userDB.role,
    };

    const token = generateToken(user, "1h");
    const subject = "Reset Password";
    const html = `
                    <p>Saludos ${user.name}</p>
                    <p>Para restablecer contraseña hacer click en el siguiente enlace: </p>
                    <a href="http://localhost:8080/reset-password/${user.email}/${token}">Aquí</a>
                    <p>Este enlace caduca en una hora</p>`;

    sendMail(user.email, subject, html);

    return res.status(200).json({
      success: true,
      message: "Link sent to your email!",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/reset-password/:email/:token", async (req, res, next) => {
  try {
    const { email, token } = req.params;
    console.log(email);
    if (!token)
      return req
        .status(500)
        .json({ status: false, message: "El link ha caducado" });

    return res.render("confirmpassword", {
      title: "Reset Password",
      email: email,
      script: "../../public/js/confirm.js",
      styles: "public/css/styles.css",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
