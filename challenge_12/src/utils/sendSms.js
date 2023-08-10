import twilio from "twilio";
import config from "../config/configuration.js";

const { twilio_sid, twilio_token, twilio_phone, my_phone } = config;

const client = twilio(twilio_sid, twilio_token, twilio_phone, my_phone);

export const sendSms = (name, lastname) => client.messages.create({
    body: `Gracias por tu compra ${name} ${lastname}`,
    from: twilio_phone,
    to: my_phone
})

export const sendWhatsapp = (name, lastname) => client.messages.create({
    body: `Gracias por tu compra ${name} ${lastname}`,
    from: `whatsapp:+14155238886`,
    to: `whatsapp:${my_phone}`
})