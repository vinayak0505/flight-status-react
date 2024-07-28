import FlightResponse from "../FlightResponse"

type TicketResponse = {
    filght: FlightResponse;
    userId: number;
    seatNumber: string;
}