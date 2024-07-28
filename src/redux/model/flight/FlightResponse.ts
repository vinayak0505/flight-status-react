type FlightResponse = {
    id: number;
    flightNumber: string;
    departureDate: string;
    arrivalDate: string;
    source: String;
    destination: String;
    price: number;
    gateNumber: string;
    seatCount: number;
    flightStatus: FlightStatus;
}


export enum FlightStatus {
    ON_TIME = "ON_TIME",
    DELAYED = "DELAYED",
    CANCELLED = "CANCELLED"
}
export default FlightResponse