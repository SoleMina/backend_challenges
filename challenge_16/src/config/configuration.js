import dotenv from 'dotenv';
import path from 'path';
import __dirname from "../utils.js";

const envPath = path.join(__dirname, '..', '.env.development');

dotenv.config({
  path: envPath
});

let config = {
  port: process.env.PORT,
  mongo_url: process.env.MONGO_URL,
  secret_session: process.env.SECRET_SESSION,
  secret_cookie: process.env.SECRET_COOKIE,
  gh_id: process.env.GH_CLIENT_ID,
  gh_secret: process.env.GH_CLIENT_SECRET,
  secret_jwt: process.env.SECRET_JWT,
  persistence: process.env.PERSISTENCE,
  gmail_user_app: process.env.GMAIL_USER_APP,
  gmail_pass_app: process.env.GMAIL_PASS_APP,
  twilio_sid: process.env.TWILIO_SID,
  twilio_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_phone: process.env.TWILIO_PHONE_NUMBER,
  my_phone: process.env.MY_PHONE_NUMBER,
}

// console.log(config, "config");
// console.log(process.env.NODE_ENV, "process.env.NODE_ENV");

export default config;