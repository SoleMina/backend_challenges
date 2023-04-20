const fs = require("fs");

//event: title, location, price, capacity, status, participants
class Manager {

    async createEvent(event) {
        try {
            let data = await fs.promises.readFile('./files/events.json', 'utf-8')
            let events = JSON.parse(data);
        } catch (err) {
            //El archivo no existe, entonces hay que crearlo
            let dataObj = {
                title: event.title,
                location: event.location,
                price: event.price,
                capacity: event.capacity,
                status: "open",
                participants: []
            }
        }
    }
}