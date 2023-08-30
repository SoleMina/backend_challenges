import mongoose from "mongoose";
import config from "./configuration.js";
// import { connect } from "mongoose";

class MongoSingleton {
    static #instance

    constructor() {
        mongoose.connect(config.mongo_url)
        .then(() => console.log("database connected"))
        .catch(err => console.log(err));
    }
    static getInstance() {
        if(this.#instance) {
            console.log("Already connected");
            return this.#instance;
        }
        this.#instance = new MongoSingleton();
        console.log("Connected");
        return this.#instance;
    }
}
export default MongoSingleton;



//database
// connect(process.env.MONGO_URL)
//   .then(() => console.log("database connected"))
//   .catch(err => console.log(err));