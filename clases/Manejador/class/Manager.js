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
}

module.exports = Manager;