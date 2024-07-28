import axios from 'axios';
import API from '../../constants/api';
import FlightResponse from '../model/flight/FlightResponse';
import UpdateFlightStatusRequestDto from '../model/flight/UpdateFlightStatusRequestDto';

class FlightService {

    static async getAllFlight() {
        const response = await axios.get(API.FLIGHTS);
        return response.data;
    }


    static async getFlight(id: String): Promise<FlightResponse> {
        const response = await axios.get(API.FLIGHTS + `/${id}`);
        return response.data;
    }

    static async updateFlightStatus(flightId: String, status: UpdateFlightStatusRequestDto) {
        const response = await axios.put(API.FLIGHTS + `/${flightId}`, status);
        return response.data;
    }
}

export default FlightService;