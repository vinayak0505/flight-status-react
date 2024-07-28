import axios from 'axios';
import API from '../../constants/api';
import FlightResponse from '../model/flight/FlightResponse';

class FlightService {
    static async getAllFlight() {
        const response = await axios.get(API.FLIGHTS);
        return response.data;
    }


    static async getFlight(id: String): Promise<FlightResponse> {
        const response = await axios.get(API.FLIGHTS + `/${id}`);
        return response.data;
    }
}

export default FlightService;