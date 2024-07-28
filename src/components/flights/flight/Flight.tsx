import { useMemo } from "react";
import FlightResponse, { FlightStatus } from "../../../redux/model/flight/FlightResponse";
import ProgressBar from "../../progress/ProgressBar";

const Flight = ({ flight }: { flight: FlightResponse }) => {

    const BOOKING_HOURS = process.env.BOOKING_HOURS ? parseInt(process.env.BOOKING_HOURS) : 2;

    const getCardColor = (): String => {
        switch (flight.flightStatus) {
            case FlightStatus.ON_TIME:
                return "bg-green-100";
            case FlightStatus.DELAYED:
                return "bg-yellow-100";
            case FlightStatus.CANCELED:
                return "bg-red-100";
            default:
                return "";
        }
    }

    const getProgress = useMemo(() => {
        try {
            const now = new Date();
            const dDate = new Date(flight.departureDate);
            if (dDate > now) return 0;
            const aDate = new Date(flight.arrivalDate);
            if (aDate < now) return 100;

            const totalDiff = Math.abs(aDate.getTime() - dDate.getTime());
            const currentDiff = Math.abs(now.getTime() - dDate.getTime());
            return ((currentDiff / totalDiff) * 100)

        } catch (error) {

        }
        return 0;
    }, [flight]);

    const canBookFlight = useMemo(() => {
        const now = new Date();
        const dDate = new Date(flight.departureDate);
        return (dDate.getTime() - (BOOKING_HOURS * 60 * 60 * 1000) > now.getTime());
    }, [flight, BOOKING_HOURS]);

    return <div className={"dark:border-gray-700 shadow-md rounded-lg p-6 " + getCardColor()}>
        <h2 className="text-lg font-semibold">Flight Details</h2>
        <div className="flex justify-between">
            <div>
                <p className="text-gray-700">Flight Number:</p>
                <p className="text-gray-900 font-medium">{flight.flightNumber}</p>
            </div>
            <div>
                <p className="text-gray-700">Status:</p>
                <p className="text-gray-900 font-medium">{flight.flightStatus}</p>
            </div>
        </div>
        <div className="flex justify-between mt-4">
            <div>
                <p className="text-gray-700">Source:</p>
                <p className="text-gray-900 font-medium">{flight.source}</p>
            </div>
            <div>
                <p className="text-gray-700">Destination:</p>
                <p className="text-gray-900 font-medium">{flight.destination}</p>
            </div>
        </div>
        <div className="flex justify-between mt-4">
            <div>
                <p className="text-gray-700">Departure:</p>
                <p className="text-gray-900 font-medium">{flight.departureDate.toString().split('T')[0]}</p>
                <p className="text-gray-900">{flight.departureDate.toString().split('T')[1].split('.')[0]}</p>
            </div>
            <div>
                <p className="text-gray-700">Arrival:</p>
                <p className="text-gray-900 font-medium">{flight.arrivalDate.toString().split('T')[0]}</p>
                <p className="text-gray-900">{flight.arrivalDate.toString().split('T')[1].split('.')[0]}</p>
            </div>
        </div>
        <div className="flex justify-between mt-4">
            <div>
                <p className="text-gray-700">Gate:</p>
                <p className="text-gray-900 font-medium">{flight.gateNumber}</p>
            </div>
            <div>
                <p className="text-gray-700">Seats:</p>
                <p className="text-gray-900 font-medium">{flight.seatCount}</p>
            </div>
        </div>
        <div className="mt-4">
            {
                canBookFlight ?
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Book Flight
                    </button> :
                    <ProgressBar percentage={getProgress} />
            }
        </div>
    </ div>
}

export default Flight;