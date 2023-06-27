import server from "./app.js";
import { connect } from "mongoose";

let PORT =  process.env.PORT || 8000;

// let ready = () => {
//     console.log("Server ready on port " + PORT);
//     connect(process.env.LINK_MONGO)
//         .then(() => console.log("database connected"))
//         .catch(err => console.log(err));
// }

const ready = async() => {
    try {
        console.log(`Server ready on port ${PORT}`);
        await connect(process.env.LINK_MONGO);
        console.log(`Connected to database`);
    } catch (error) {
        console.log(error);
    }
}
server.listen(PORT, ready);
