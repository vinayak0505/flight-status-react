import axios from "axios";
import API from "../../constants/api";
import BuyTicketRequest from "../model/ticket/BuyTicketRequest";
import TicketResponse from "../model/ticket/TicketResponse";

class TicketService {

    static getAvailableTickets = async (id: string): Promise<number[]> => {
        const response = await axios.get(`${API.TICKET}/flight/${id}`);
        return response.data;
    }

    static buyTicket = async (buyTicket: BuyTicketRequest): Promise<void> => {
        const response = await axios.post(`${API.TICKET}`, buyTicket);
        return response.data;
    }

    static getTicketsByUserId = async (): Promise<TicketResponse[]> => {
        const response = await axios.get(`${API.TICKET}`);
        return response.data;
    }
}

export default TicketService;