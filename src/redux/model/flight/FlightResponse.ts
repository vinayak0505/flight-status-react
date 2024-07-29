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

export const stringToFlightStatus = (str: String): FlightStatus => {
    switch (str) {
        case "ON_TIME":
            return FlightStatus.ON_TIME;
        case "DELAYED":
            return FlightStatus.DELAYED;
        case "CANCELLED":
            return FlightStatus.CANCELLED;
        default:
            return FlightStatus.ON_TIME;
    }
}
export default FlightResponse