import { Router } from "express";
import Adopcion from "../classes/Adopcion.js";

const router = Router();
const contenedor = new Adopcion();

//GETS
router.get("/", (req, res) => {
    contenedor.getAllUsers().then(result => {
        res.send(result);
    })
});
router.get("/", async (req, res) => {
    let limite_de_edad = req.query.age;
    limite_de_edad = parseInt(limite_de_edad);
    try {
        await contenedor.getAllUsers().then(result => {
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
router.get("/:uid", (req, res) => {
    let id = req.params.uid;
    id = parseInt(id);
    console.log(id);
    contenedor.getUserById(id).then(result => {
        console.log(result);
        res.send(result);
    })
});

//POTS
router.post("/", (req, res) => {
    let cuerpo = req.body;
    contenedor.registerUser(cuerpo).then(result => {
        res.send(result);
    })
})
//PUTS
router.put("/:uid", (req, res) => {
    let id = parseInt(req.params.uid);
    let body = req.body;
    contenedor.updateUser(id, body).then(result => {
        res.send(result);
    })
});

//DELETES
router.delete("/:uid", (req, res) => {
    let id = parseInt(req.params.uid);
    contenedor.deleteUser(id).then(result => {
        res.send(result);
    })
});

export default router;