import { useEffect, useMemo } from "react";
import { useAppDispatch } from "../../redux/store";
import { flightSelector, getAllFlights } from "../../redux/reducer/flight.reducer";
import { useSelector } from "react-redux";
import Flight from "./flight/Flight";
import FlightResponse from "../../redux/model/flight/FlightResponse";
import { authSelector } from "../../redux/reducer/auth.reducer";
import UserRole from "../../redux/model/user/UserRole";
import Loading from "../loading/Loading";

const Flights = () => {
    const dispatch = useAppDispatch();

    const BOOKING_HOURS = process.env.BOOKING_HOURS ? parseInt(process.env.BOOKING_HOURS) : 2;

    const { flights, loading } = useSelector(flightSelector);
    const { user } = useSelector(authSelector);

    useEffect(() => {
        dispatch(getAllFlights());
    }, [dispatch]);

    const canBookFlights = useMemo(() => {
        const canBookFlight = [];
        for (let index = 0; index < flights.length; index++) {
            const now = new Date();
            const dDate = new Date(flights[index].departureDate);
            canBookFlight.push(dDate.getTime() - (BOOKING_HOURS * 60 * 60 * 1000) > now.getTime());
        }

        return canBookFlight;

    }, [flights, BOOKING_HOURS]);

    if(loading){
        return <Loading/>
    }

    return (
        <div className="flex flex-col gap-3">
            {
                flights.map((flight: FlightResponse, i: number) => <Flight key={flight.id} flight={flight} canBookFlight={canBookFlights[i]} canUpdateStatus={user?.role === UserRole.ADMIN} />)
            }
        </div>
    );
};

export default Flights;