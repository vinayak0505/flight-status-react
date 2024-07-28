import FlightResponse from "../flight/FlightResponse"

type TicketResponse = {
    filght: FlightResponse;
    userId: number;
    seatNumber: string;
}

export default TicketResponse;