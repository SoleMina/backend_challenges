import { model, Schema, Types } from "mongoose";

let collection = "tickets";

const schema = new Schema({
    user: [{
        user_id: {type: Types.ObjectId, ref: "users", required: true},
        email: { type: String, required: true}
    }],
    code: { type: String, required: true},
    purchase_datetime: { type: Date },
    amount: { type: Number, required: true},
    purcharser: { type: String, required: true}
});

const Ticket = model(collection, schema);

export default Ticket;