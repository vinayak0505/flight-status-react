type FlightResponse = {
    id: number;
    flightNumber: string;
    departureDate: Date;
    arrivalDate: Date;
    source: String;
    destination: String;
    price: number;
    gateNumber: string;
    seatCount: number;
    flightStatus: FlightStatus;
}

export const parseFlightResponse = (response: any): FlightResponse => {
    return {
        id: response.id,
        flightNumber: response.flightNumber,
        departureDate: new Date(response.departureDate),
        arrivalDate: new Date(response.arrivalDate),
        source: response.source,
        destination: response.destination,
        price: response.price,
        gateNumber: response.gateNumber,
        seatCount: response.seatCount,
        flightStatus: response.flightStatus
    } as FlightResponse;
}

export enum FlightStatus {
    ON_TIME = "ON_TIME",
    DELAYED = "DELAYED",
    CANCELLED = "CANCELLED"
}
export default FlightResponse