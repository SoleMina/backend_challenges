import { Schema, model} from "mongoose";

const collection = "users";

const schema = new Schema({
    name: {type: String, required: true},
    photo: {type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8rQTfvDS0mK_Y09wABdP_UOwfxiuQLqWcUQ&usqp=CAU"},
    email: {type: String, required: true, index: true, unique: true},
    age: {type: Number, required: true},
    // role: {type: Number, required: true, default: 0},
    password: {type: String, required: true},
    role: {
        type: String,
        enum: ['user', 'admin', 'premium'],
        default: 'user'
    }
});

const User =model(collection, schema);

export default User;