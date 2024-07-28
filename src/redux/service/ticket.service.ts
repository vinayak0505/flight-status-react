import axios from "axios";
import API from "../../constants/api";
import BuyTicketRequest from "../model/flight/ticket/BuyTicketRequest";

class TicketService {
    static getAvailableTickets = async (id: string): Promise<number[]> => {
        const response = await axios.get(`${API.TICKET}/flight/${id}`);
        return response.data;
    }

    static buyTicket = async (buyTicket: BuyTicketRequest): Promise<void> => {
        await axios.post(`${API.TICKET}`, buyTicket);
    }
}

export default TicketService;