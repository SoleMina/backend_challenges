import { Router } from "express";
import Adopcion from "../classes/Adopcion.js";

const router = Router();
const contenedor = new Adopcion(); 

//GETS
router.get("/", (req, res) => {
    contenedor.getAllPets().then(result => {
        console.log(result);
        res.send(result);
    })
});
router.get("/:pid", (req, res) => {
    let id = parseInt(req.params.pid);
    contenedor.getPetById(id).then(result => {
        res.send(result);
    })
});

//POSTS
router.post("/", (req, res) => {
    let body = req.body;
    console.log(body);
    contenedor.registerPet(body).then(result => {
        res.send(result);
    })
});

//PUTS
router.put("/:pid", (req, res) => {
    let body = req.body;
    let id = parseInt(req.params.pid);
    contenedor.updatePet(id, body).then(result => {
        res.send(result);
    })
});

//DELETES
router.delete("/:pid", (req, res) => {
    let id = parseInt(req.params.pid);
    contenedor.deletePet(id).then(result => {
        res.send(result);
    })
});

export default router;