import express from "express";
import { config } from "./config/config.js";
import { sendMail } from "./utils/sendMail.js";
import router from "./routes/index.js";

const app = express();
const PORT = config.port;
config.dbConnection();

app.use(express.static("public"));
app.listen(PORT, () => {
    console.log(`Server on pot: ${PORT}`);
})
app.use(router);