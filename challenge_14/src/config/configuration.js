import dotenv from 'dotenv';
import path from 'path';
import __dirname from "../utils.js";

const envPath = path.join(__dirname, '..', '.env.development');

dotenv.config({
  path: envPath
});

let config = {
    twilio_sid: process.env.TWILIO_SID,
    twilio_token: "process.env.TWILIO_AUTH_TOKEN",
    twilio_phone: "process.env.TWILIO_PHONE_NUMBER",
    my_phone: "process.env.MY_PHONE_NUMBER"
}

console.log(config, "config");
console.log(process.env, "process.env");
console.log(process.env.NODE_ENV, "process.env.NODE_ENV");

export default config;