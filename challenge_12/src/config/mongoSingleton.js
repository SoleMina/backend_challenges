import mongoose from "mongoose";

class MongoSingleton {
    static #instance

    constructor() {
        mongoose.connect(process.env.MONGO_URL)
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