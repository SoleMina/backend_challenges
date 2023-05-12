import express from "express";
import fs from "fs";
import {engine} from "express-handlebars";

const app = express();

const PORT = 8000;

const server = app.listen(PORT, () => {
    console.log(`Listening server on ${PORT}`);
});

// app.engine("420", (ruta, objeto, callback) => {
//     fs.readFile(ruta, (err, content) => {
//         if(err) return callback(new Error(err));
//         const plantillaProcesada = content.toString()
//         .replace("#title#", ""+objeto.title + "")
//         .replace("#message#", ""+objeto.message+"")
//         return callback(null, plantillaProcesada);
//     });
// });
app.engine("handlebars", engine());

app.set("views", "./views"); //para mostrar vistar irse a la carpeta vistas
// app.set("view engine", "420");
app.set("view engine", "handlebars");
app.use(express.static("public"));

// app.get("/", (req, res) => {
//     res.render("plantilla1", {
//         title: "HOLA CODERS",
//         message: "Este es un mensaje"
//     });
// })

const simulacionDeRequestDeAPI = () => [
    {id: 1, name: "perro", specie: "dog", age: 2},
    {id: 1, name: "gato", specie: "cat", age: 3},
    {id: 1, name: "osito", specie: "dog", age: 2},
    {id: 1, name: "faraoni", specie: "dog", age: 2},
]
app.get("/", (req, res) => {
    let pets = simulacionDeRequestDeAPI;
    let renderObj = {
        arregloMascotas: pets
    }
    res.render("Home", renderObj);
})