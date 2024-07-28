import { useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import { getAllFlights } from "../../redux/reducer/flight.reducer";
import { useSelector } from "react-redux";
import Flight from "./flight/Flight";

const Flights = () => {
    const dispatch = useAppDispatch();

    const { flights } = useSelector((state: any) => state.flightReducer);

    useEffect(() => {
        dispatch(getAllFlights());
    }, [dispatch]);

    return (
        <div className="flex flex-col gap-3">
            {
                flights.map((flight: any) => <Flight key={flight.id} flight={flight} />)
            }
        </div>
    );
};

export default Flights;