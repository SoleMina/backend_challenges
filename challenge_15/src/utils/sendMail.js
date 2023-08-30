import nodemailer from "nodemailer";
import __dirname from "../utils.js";

const gmail_user_app = process.env.GMAIL_USER_APP;
const gmail_pass_app = process.env.GMAIL_PASS_APP;

console.log(gmail_user_app);
console.log(gmail_pass_app);

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: gmail_user_app,
        pass: gmail_pass_app
    }
});


export const sendMail = async () => {
    return await transport.sendMail({
        from: "Coder Test <karina.pradogutierrez@gmail.com>",
        to: "karina.pradogutierrez@gmail.com",
        subject: "Correo electrónico de prueba",
        html: `<h1>Esto es un correo de prueba</h1>`,
        attachments: [
            {
                filename: "nodejs.jpg",
                path: __dirname + "/utils/nodejs.jpg",
                cid: "nodejs"
            }
        ]
    })
}
