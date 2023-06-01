import {Schema, model} from "mongoose";

let collection = "students";

let schema = new Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    age: {type: Number, required: true},
    dni: {type: String, required: true, unique: true},
    course: {type: String, required: true},
    note: {type: Number, required: true},
});

const Student = model(collection, schema);

export default Student;