import FlightResponse from "../../redux/model/flight/FlightResponse"

type BookFlightData = {
    flightData: FlightResponse;
    seatsBooked: number[];
}

export default BookFlightData;