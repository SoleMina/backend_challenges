import {connect} from "mongoose";
import { config } from "../config/config.js";

class MongoSingleton {
    static #instance

    constructor() {
        connect(config.mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
    static getInstance() {
        if(this.#instance) {
            console.log("Base de datos ya creada");
            return this.#instance;
        }

        this.#instance = new MongoSingleton();
        console.log("Base de datos creada");
        return this.#instance;
    }
}

export default MongoSingleton;