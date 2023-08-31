// import 'dotenv/config';
import dotenv from "dotenv";
import commander from "../utils/commander.js";
import MongoSingleton from "../utils/singleton.js";

const { mode } = commander.opts();

dotenv.config({
    path: mode === "development" ? "./.env.development" : "./.env.production"
});

console.log(commander.opts());

export const config = {
    port: process.env.PORT || 8000,
    mongo_url: process.env.MONGO_URL,
    google_mail_user: process.env.GOOGLE_USER,
    google_mail_pass: process.env.GOOGLE_PASS,
    persistence: process.env.PERSISTENCE,
    dbConnection:  async () => { return await MongoSingleton.getInstance()}

}