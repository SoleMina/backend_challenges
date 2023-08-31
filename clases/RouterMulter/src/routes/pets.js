import { Router } from "express";
import Adopcion from "../classes/Adopcion.js";
import upload from "../services/upload.js";
import {io} from "../../app.js";

const router = Router();
const contenedor = new Adopcion(); 

router.use((req, res, next) => {
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log(`Petición hecha a las: ${time.toTimeString().split(" ")[0]}`);
    next();
});

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
router.post("/", upload.single("image"), (req, res) => {
    let file = req.file;
    let pet = req.body;
    console.log(pet, "pet");
    pet.thumbnail = req.protocol + "://" + req.hostname + ":3000"+ "/images/" + file.filename;
    contenedor.registerPet(pet).then(result => {
        res.send(result);
        if(result.status === "success") {
            contenedor.getAllPets().then(result => {
                io.emit("deliverPets", result);
            })
        }
    })
})
// router.post("/",  upload.fields(
//     [
//         {
//         name: "image", maxCount: 1
//         },
//        {
//         name: "documents", maxCount: 1
//        }
//     ]
// ), (req, res) => {
//     let body = req.body;
//     console.log(body);
//     body.age = Number(body.age);
//     console.log(body);
//     contenedor.registerPet(body).then(result => {
//         res.send(result);
//     })
// });
// router.post("/",  upload.single("image"), (req, res) => {
//     let body = req.body;
//     console.log(body);
//     body.age = Number(body.age);
//     let thumbnail = "http://localhost:3000/images/" + req.file.filename;
//     body.thumbnail = thumbnail;
//     console.log(body);
//     contenedor.registerPet(body).then(result => {
//         res.send(result);
//     })
// });

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