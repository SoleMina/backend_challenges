import express from "express";
import Adopcion from "./src/classes/Adopcion.js";
import petsRouter from "./src/routes/pets.js";
import usersRouter from "./src/routes/users.js";
import __dirname from "./utils.js";
import upload from "./src/services/upload.js";
import {engine} from "express-handlebars";
import { connect } from "mongoose";
import {Server} from "socket.io";

const app = express();
const PORT = process.env.PORT || 3000;

const contenedor = new Adopcion();

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
});

export const io = new Server(server);

app.engine("handlebars", engine());
app.set("views", __dirname + "/src/views");
app.set("view engine", "handlebars");

//Lee todo tipo de archivos
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.use("/api/pets", petsRouter);
app.use("/api/users", usersRouter);

// app.use(upload.single("file")); dosen't work for now

// app.use(express.static("public"));
// app.use(express.static(__dirname + "/src/public"));
// app.use("/images", express.static(__dirname + "/src/public"));

// const cors = require("cors");
// app.use(cors());

//database
connect("mongodb+srv://admin:Karina137@cluster0.lpiuuos.mongodb.net/coder")
  .then(() => console.log("database connected"))
  .catch(err => console.log(err));

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Error en el servidor");
});

app.post("/api/adoption", (req, res) => {
    let usuarioId = parseInt(req.body.uid);
    let petId = parseInt(req.body.pid);

    contenedor.adoptPet(usuarioId, petId).then(result => {
        res.send(result);
    })
});
app.post("/api/uploadfile", upload.single("file"), (req, res) => {
    //req.file is not from upload.single("file") name
    //upload.single -> file
    //upload.array -> files
   try {
     const files = req.file;
     if(!files || files.length === 0) {
       res.status(500).send({message: "No se subió archivo"});
     }
     res.send(files);
   } catch (error) {
     console.log(error);
   }

});

app.get('/view/pets',(req,res)=>{
  contenedor.getAllPets().then(result=>{
      let info = result.payload;
      let preparedObject ={
          pets : info
      }
      res.render('pets', preparedObject)
  })
});

//socket
io.on("connection", async socket => {
  console.log(`El socket ${socket.id} se ha conectado`);
  let pets = await contenedor.getAllPets();
  socket.emit("deliverPets", pets);

});
