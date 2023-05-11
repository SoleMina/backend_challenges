import express from "express";
import router from "./router/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import not_found_handler from "./middlewares/notFoundHandlers.js";
import {engine} from "express-handlebars";
import __dirname from "../utils.js";

let server = express();
let PORT = 8080;

let ready = () => console.log("Server ready on port " + PORT);


server.engine("handlebars", engine());      //Inicializamos el motor de plantilla
server.set("view engine", "handlebars");    //Configurar el motor para que funcione
server.set("views", __dirname + "/src/views"); //Configurar donde irán las plantillas
server.listen(PORT, ready);
server.use('/public', express.static("public"));
server.use(express.urlencoded({extended:true}));
server.use(express.json());
server.use("/", router);
server.use(errorHandler);
server.use(not_found_handler);



// let index_route = "/";
// let index_function = (req, res) => {
//     let quantity = manager.read_users().length;
//     return res.send(`There are ${quantity} users`);
// }

// server.get(index_route, index_function);

// let one_route = "/users/:id";
// let one_function = (req, res) => {
//     let {id} = req.params;
//     id = Number(id);
//     let one = manager.read_user(id);
//     if(one) {
//         return res.send({
//             success: true,
//             user: one
//         });
//     }else {
//         return res.send({
//             success: false,
//             user: "Not found"
//         });
//     }
// }
// server.get(one_route, one_function);

// let query_route = "/users";
// //let query_route = "/users?quantity=2";    query
// let query_function = (req, res) => {
//     let quantity = req.query.quantity ?? 5;
//     let users = manager.read_users().slice(0, quantity);
//     if(users.length > 0) {
//         return res.send({
//             success: true, 
//             users
//         })
//     }else {
//         return res.send({
//             success: false, 
//             users: 'Not found'
//         })
//     }
// };

// server.get(query_route, query_function);

// //EXPRESS ADVANCE
// server.post("/users", (req, res) => {
//     // let name = req.body.name ?? null;
//     const {name, lastname, age, carts } = req.body;
//     if(name && lastname && age && carts) {
//         manager.add_user({name, lastname, age, carts});
//         return res.json({
//             status: 201,
//             message: "created"
//         });
//     }else{
//         return res.json({
//             status: 400,
//             message: "Check data!"
//         });
//     }
// });
// server.put("/users/:uid", (req, res) => {
//         let {uid: id } = req.params;
//         id = Number(id);
//         let data = req.body;
//         console.log(data, 'data');
//         if(id && req.body) {
//             manager.update_user(id, data);
//            return res.json({
//             status: 200,
//             message: "User updated!"
//            })
//         }else{
//             return res.json({
//                 status: 400,
//                 message: "Check data!"
//             })
//         }

// })