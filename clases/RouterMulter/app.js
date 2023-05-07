import express from "express";
import multer from "multer";
import Adopcion from "./src/classes/Adopcion.js";
import router from "./src/routes/pets.js";
import router_user from "./src/routes/users.js";
import __dirname from "./utils.js";
const app = express();
const PORT = process.env.PORT || 3000;


const contenedor = new Adopcion(); 
const petsRouter = router;
const usersRouter = router_user;

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const upload = multer({storage: storage});

//Lee todo tipo de archivos
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(express.static("public"));
// app.use(express.static(__dirname + "/src/public"));
// app.use("/images", express.static(__dirname + "/src/public"));
app.use(express.static(__dirname + "/public"));
// const cors = require("cors");
// app.use(cors());

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Error en el servidor");
});

app.use((req, res, next) => {
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log(`Petición hecha a las: ${time.toTimeString().split(" ")[0]}`);
    next();
});

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
app.post("/api/uploadfile", upload.single("file"), (req, res) => {
    const files = req.file;
    console.log(files);
    if(!files || files.length === 0) {
      res.status(500).send({message: "No se subió archivo"});
    }
    res.send(files);

});