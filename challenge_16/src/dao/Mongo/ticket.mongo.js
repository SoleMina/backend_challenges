import Ticket from "./models/Ticket.js";

 
class TicketDaoMongo {
    constructor() {
        this.ticketModel = Ticket;
    }

    getTickets = async() => {
        return await Ticket.find();
    }

    getTicketById = async(tid) => {
        return await Ticket.findById({_id: tid});
    }

    createTicket = async(newTicket) => {
        return await Ticket.create(newTicket);
    }
}
export default TicketDaoMongo;