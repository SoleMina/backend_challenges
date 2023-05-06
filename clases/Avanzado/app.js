import express from "express";
import Adopcion from "./classes/Adopcion.js";
const app = express();
const PORT = process.env.PORT || 8080;

//Lee todo tipo de archivos
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const contenedor = new Adopcion(); 

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
});

app.get("/api/users", async (req, res) => {
    let limite_de_edad = req.query.age;
    limite_de_edad = parseInt(limite_de_edad);
    try {
        await contenedor.getAllUsers.then(result => {
            let arreglo = result.payload;
            let nuevoArreglo = arreglo.filter(user => user.age > limite_de_edad);
            if(nuevoArreglo.length > 0) {
                res.send({usuarios: nuevoArreglo});
            }else{
                res.status(400).send({message: "No se ecnontró usuario"});
            }
        })
    } catch (error) {
        console.log(error)
    }
});

app.get("./api/users/:uid", (req, res) => {
    let id = req.req.params.uid;
    id = parseInt(id);
    contenedor.getUserById(id).then(result => {
        res.send(result);
    })
});
app.post("./api/users", (req, res) => {
    let cuerpo = req.body;
    contenedor.registerUser(cuerpo).then(result => {
        res.send(result);
    })
});
app.post("/api/pets", (req, res) => {
    let body = req.body;
    console.log(body);
    contenedor.registerPet(body).then(result => {
        res.send(result);
    })
});
app.put("/api/users/:uid", (req, res) => {
    let id = parseInt(req.params.uid);
    let body = req.body;
    contenedor.updateUser(id, body).then(result => {
        res.send(result);
    })
});
app.delete("/api/pets/:pid", (req, res) => {
    let id = parseInt(req.params.pid);
    contenedor.deletePet(id).then(result => {
        res.send(result);
    })
});
app.post("/api/adoption", (req, res) => {
    let usuarioId = parseInt(req.body.uid);
    let petId = parseInt(req.body.pid);

    contenedor.adoptPet(usuarioId, petId).then(result => {
        res.send(result);
    })
})

// app.get("/api/users", async (req, res) => {
//     let limite_de_edad = req.query.age;
//     limite_de_edad = parseInt(limite_de_edad);
//     try {
//         await contenedor.getAllUsers().then(result => {
//             console.log(result, "result");
//             let arreglo = result.payload;
//             console.log(arreglo, "arreglo");
//             if(arreglo.length > 0) {
//                 let nuevoArreglo = arreglo.filter(user => user.age > limite_de_edad);
//                 if(nuevoArreglo.length > 0) {
//                     res.send({usuarios: nuevoArreglo});
//                 }else{
//                     res.status(400).send({message: "No se ecnontró usuario"});
//                 }
//             }else{
//                 res.status(400).send({message: "No se ecnontró usuario"});
//             }
//         })
//     } catch (error) {
//         console.log("Errorrrrr" + error)
//     }
// });
// app.get("/api/users", (req, res) => {
//     contenedor.getAllUsers().then(result => {
//         res.send(result);
//     })
// });
// app.get("/api/users/:uid", (req, res) => {
//     let id = req.req.params.uid;
//     id = parseInt(id);
//     contenedor.getUserById(id).then(result => {
//         res.send(result);
//     })
// });
// app.post("/api/users", (req, res) => {
//     let cuerpo = req.body;
//     contenedor.registerUser(cuerpo).then(result => {
//         res.send(result);
//     })
// });
// app.get("api/pets/:pid", (req, res) => {
//     let id = parseInt(req.params.pid);
//     contenedor.getPetById(id).then(result => {
//         res.send(result);
//     })
// });
// app.get("/api/pets", (req, res) => {
//     contenedor.getAllPets().then(result => {
//         res.send(result);
//     })
// });
// app.post("/api/pets", (req, res) => {
//     let body = req.body;
//     console.log(body);
//     contenedor.registerPet(body).then(result => {
//         res.send(result);
//     })
// });
// app.put("/api/pets/:pid", (req, res) => {
//   let body = req.body;
//   let id = parseInt(req.params.pid);
//   contenedor.updatePet(id, body).then(result => {
//     res.send(result);
//   })
// });
// app.put("/api/users/:uid", (req, res) => {
//     let id = parseInt(req.params.uid);
//     let body = req.body;
//     contenedor.updateUser(id, body).then(result => {
//         res.send(result);
//     })
// });
// app.delete("/api/users/:uid", (req, res) => {
//     let id = parseInt(req.params.uid);
//     contenedor.deleteUser(id).then(result => {
//         res.send(result);
//     })
// });
// app.delete("/api/pets/:pid", (req, res) => {
//     let id = parseInt(req.params.pid);
//     contenedor.deletePet(id).then(result => {
//         res.send(result);
//     })
// });