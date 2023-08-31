import { createTransport } from "nodemailer";
import { config } from "../config/config.js";

const transport = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: config.google_mail_user,
        pass: config.google_mail_pass
    }
});
export const sendMail = async (userMail, subject, html) => {
    return await transport.sendMail({
        from: `<Servicio de email ${config.google_mail}>`,
        to: userMail,
        subject,
        html
    });
}