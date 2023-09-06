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


export const sendMail = async ( emailUser, subject, html) => {
    return await transport.sendMail({
        from: `Email: <karina.pradogutierrez@gmail.com>`,
        to: emailUser,
        subject: subject,
        //html: `<h1>${message}</h1>`,
        html: html,
        attachments: [
            {
                filename: "nodejs.jpg",
                path: __dirname + "/utils/nodejs.jpg",
                cid: "nodejs"
            }
        ]
    })
}
