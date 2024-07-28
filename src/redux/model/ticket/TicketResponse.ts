import FlightResponse from "../flight/FlightResponse"

type TicketResponse = {
    flight: FlightResponse;
    userId: number;
    seatNumber: number;
    createdAt: String;
}

export default TicketResponse;