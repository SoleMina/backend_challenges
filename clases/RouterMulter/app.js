import express from "express";
import Adopcion from "./src/classes/Adopcion.js";
import router from "./src/routes/pets.js";
import router_user from "./src/routes/users.js";
const app = express();
const PORT = process.env.PORT || 3000;


const contenedor = new Adopcion(); 
const petsRouter = router;
const usersRouter = router_user;

//Lee todo tipo de archivos
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api/pets", petsRouter);
app.use("/api/users", usersRouter);


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
});


app.post("/api/adoption", (req, res) => {
    let usuarioId = parseInt(req.body.uid);
    let petId = parseInt(req.body.pid);

    contenedor.adoptPet(usuarioId, petId).then(result => {
        res.send(result);
    })
});