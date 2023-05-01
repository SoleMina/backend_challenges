const express = require("express");
const app = express();
const Manager = require("./class/Manager");
require('dotenv').config();
const PORT = process.env.PORT || 8080;

const manager = new Manager();
// manager.registerUser({name: "Soledad", lastname: "Prado", age: 21, products: []});
app.listen(PORT, () => {
    console.log("Listening server on: " + PORT);
})

app.get("/", (req, res) => {
    res.send("Helloooo");
})
app.get("/events", (req, res) => {
    manager.getAllEvents().then(result => {
        if(result.status === "success") {
            res.status(200).send(result.payload);
        }else{
            res.status(500).send(result.message);
        }
    })
});
app.get("/eventos", (req, res) => {
    const status = req.query.status;
    manager.getAllEvents().then(result => {
        if(result.status === "success") {
            let events = result.payload;
            let eventsFiltered = events.filter((evt) => evt.status === status);
            if(eventsFiltered.length > 0) {
                res.status(200).send(eventsFiltered);
            }else{
                res.status(404).send("No hay eventos disponibles");
            }
        }else{
            res.status(500).send(result.message);
        }
    })
});
// app.get("./users", (req, res) => {
//     manager.getAllUsers().then(result => {
//         if(result.status === "success") {
//             res.status(200).send(result.payload);
//         }else{
//             res.status(500).send(result.message);
//         }
//     })
// });

// app.get("./users", (req, res) => {
//     manager.registerUser({name: "Karina", lastname: "Prado", age: 25, products: []});
//     res.status(200).send("Listo");
// })

app.get("/users", async (req, res) => {
    let usuarios = await manager.getAllUsers();
    console.log(usuarios);
    res.status(200).send(usuarios);
});
app.get("/users/:uid", (req, res) => {
    //destructuring and rename
    const {uid: id} = req.params;
    manager.getUserById(id).then((result) => {
        res.status(200).send(result);
    })
})