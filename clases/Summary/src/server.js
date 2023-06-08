import server from "./app.js";
import {connect} from "mongoose";

const PORT = process.env.PORT || 3000;

const ready =  () => {
  console.log(`Server listening on port: ${PORT}`);
  //database
  connect(process.env.LINK_MONGO)
    .then(() => console.log("database connected"))
    .catch(err => console.log(err));
};

server.listen(PORT, ready);