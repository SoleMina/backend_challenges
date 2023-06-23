import server from "./app.js";
import "dotenv/config.js";
import { Server } from "socket.io";


let PORT = process.env.PORT || 8000;
let ready = () => console.log("Server ready on port " + PORT);

let http_server = server.listen(PORT, ready);
let socket_server = new Server(http_server);

let contador = 0;

socket_server.on( //on srive para escuchar los mensajes que llegan (en este caso del cliente)
    "connection", //identificador del mensaje a escuchar
    socket => {
        console.log(`client ${socket.client.id} connected`);
        socket.on("primera_conexion", data => {
            console.log(data.name);
        });
        socket.on("message", data => {
            console.log("User is: ", data.user);
            contador++;
            socket_server.emit("contador", contador);
        });
        
});


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