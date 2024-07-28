import axios from 'axios';
import API from '../../constants/api';
import { parseFlightResponse } from '../model/flight/FlightResponse';

class FlightService {
    static async getAllFlight() {
        
        const response = await axios.get(API.FLIGHTS);

        return response.data;
    }
}

export default FlightService;