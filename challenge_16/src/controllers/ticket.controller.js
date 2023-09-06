import { ticketService } from "../service";

class TicketController {
  constructor() {
    this.ticketService = ticketService;
  }

  getTickets = async (req, res, next) => {
    try {
      const data = await this.ticketService.getTickets();
      if (data) {
        console.log(data);
        return res.status(200).json({
          success: true,
          products: data,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `Not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  };
  getTicketById = async (req, res, next) => {
    const { tid } = req.params;

    try {
      const data = await this.ticketService.getTicketById(tid);

      if (data) {
        return res.status(200).json({
          success: true,
          payload: data,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `Ticket not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  createTicket = async (req, res, next) => {
    try {
      const newTicket = req.body;
      const ticket = await this.ticketService.createTicket(newTicket);
      if (ticket) {
        return res.status(200).json({
          success: true,
          payload: ticket,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: `Couldn't create ticket`,
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default TicketController;
