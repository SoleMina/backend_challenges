const fs = require("fs");
const makeId = require("../utils");

//event: title, location, price, capacity, status, participants
class Manager {

    async createEvent(event) {
        try {
            //Si el archivo existe
            let data = await fs.promises.readFile('./files/events.json', 'utf-8')
            let events = JSON.parse(data);

            //Si existe un evento con el mismo nombre
            if(events.some(evt => evt.title === event.title)) {
                return {status: "error", message: "Event already exist"}
            }else{
                let dataObj = {
                    id: makeId(7),
                    title: event.title,
                    location: event.location,
                    price: event.price,
                    capacity: event.capacity,
                    status: "open",
                    participants: []
                }
                events.push(dataObj);

                try {
                    await fs.promises.writeFile("./files/events.json", JSON.stringify(events, null, 2));
                    return {status: "success", message: "Event created successfully!"}
                } catch (error) {
                    return {status: "error", message: "Cannot create event" + error}
                }

            }
        } catch (err) {
            //El archivo no existe, entonces hay que crearlo
            let dataObj = {
                id: makeId(7),
                title: event.title,
                location: event.location,
                price: event.price,
                capacity: event.capacity,
                status: "open",
                participants: []
            }

            try {
                await fs.promises.writeFile("./files/events.json", JSON.stringify([dataObj], null, 2));
                return {status: "success", message: "Event created successfully!"}
            } catch (error) {
                return {status: "error", message: "Cannot create user" + error}
            }
        }
    }
    async getById(id) {
        try {
            let data = await fs.promises.readFile("./files/events.json", "utf-8");
            let events = JSON.parse(data);
            console.log(events, "events");
            // let exist = events.some(evt => evt.id === id);
            // if(exist) {
            //     let event = events.find(evt => evt.id === id);
            //     console.log(event, "event");
            //     return {status: "success", message: `Event: ${event}`}
            // }
            let event = events.find(evt => evt.id === id);
            if(!event) {
                return {status: "error", event: null, message: "Event not found"}
            }else{
                return {status: "success", event: event}
            }

        } catch (error) {
            return {status: "error", message:`Event not found: ${error}`}
        }
    }
    async getAllEvents() {
        try {
            let data = await fs.promises.readFile("./files/events.json", "utf-8");
            let events = JSON.parse(data);
            return { status: "success", payload: events}
        } catch (error) {
            return { status: "error", message: "Error al obtener eventos"}
        }
    }
    async registerUser(user){
        try{
            let data = await fs.promises.readFile('./files/users.txt','utf-8');
            let users = JSON.parse(data);
            let id = users[users.length-1].id+1;
            user.hasPet = false;
            user = Object.assign({id:id},user);
            users.push(user);
            try{
                await fs.promises.writeFile('./files/users.txt',JSON.stringify(users,null,2));
                return {status:"success",message:"Usuario registrado"}
            }catch{
                return {status:"error",message:"No se pudo registrar al usuario"} 
            }
        }catch{
            user.hasPet = false;
            user = Object.assign({id:1},user)
            try{
                await fs.promises.writeFile('./files/users.txt',JSON.stringify([user],null,2));
                return {status:"success", message:"Usuario registrado"}
            }
            catch{
                return {status:"error",message:"No se pudo registrar al usuario"}
            }
        }
    }
    async getAllUsers(){
        try{
            let data = await fs.promises.readFile('./files/users.txt','utf-8');
            let users = JSON.parse(data);
            console.log(users);
            return {status:"success", payload: users}
        }catch{
            return {status:"error", message:"Error al obtener los usuarios. Intente más tarde"}
        }
    }
    async getUserById(id) {
        try {
            let data = await fs.promises.readFile("./files/users.txt", "utf-8");
            let users = JSON.parse(data);
            let user = users.find(evt => Number(evt.id) === Number(id));
            if(!user) {
                return {status: "error", user: null, message: "User not found"}
            }else{
                return {status: "success", user: user}
            }

        } catch (error) {
            return {status: "error", message:`User not found: ${error}`}
        }
    }
}

module.exports = Manager;