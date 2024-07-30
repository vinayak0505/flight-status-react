import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TicketService from '../../redux/service/ticket.service';
import FlightService from '../../redux/service/flight.service';
import BookFlightData from './UpdateFlightData';
import FlightResponse, { FlightStatus } from '../../redux/model/flight/FlightResponse';
import Flight from '../../components/flights/flight/Flight';
import { useSelector } from 'react-redux';
import DropDown from '../../components/dropdown/DropDown';
import UserRole from '../../redux/model/user/UserRole';
import { authSelector } from '../../redux/reducer/auth.reducer';
import Loading from '../../components/loading/Loading';

const UpdateFlight = () => {

    const flightId = useParams().id;
    const [data, setData] = useState<BookFlightData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<FlightStatus | null>(null);
    const { user } = useSelector(authSelector);
    const [gate, setGate] = useState<string>("");

    useEffect(() => {

        if (flightId == null) {
            setError("Flight id not found");
            return;
        }

        setLoading(true);
        const promises = [TicketService.getAvailableTickets(flightId), FlightService.getFlight(flightId)];

        Promise.all(promises).then((values) => {
            const tickets: number[] = values[0] as number[];
            const flight: FlightResponse = values[1] as FlightResponse;
            setData({ flightData: flight, seatsBooked: tickets });
            setGate(flight.gateNumber ?? "");
        }).catch((error) => {
            setError(error?.toString() ?? "Something went wrong");
        }).finally(() => {
            setLoading(false);
        });
    }, [flightId]);

    if (loading) {
        return <Loading />
    }

    if (error || data == null) {
        return <p className="text-white text-center">{error ?? "Something went wrong"}</p>
    }


    if (user?.role !== UserRole.ADMIN) {
        return <p className="text-white text-center">Unauthorized</p>
    }


    const isUpdateDisabled = () => {
        if (status == null || status === data.flightData.flightStatus) {
            return true;
        }
        return false;
    }

    const onUpdateStatusClicked = async () => {
        if (flightId == null || status == null || status === data.flightData.flightStatus) {
            return;
        }
        try {
            setLoading(true);
            await FlightService.updateFlightStatus(flightId, { flightStatus: status });
            setStatus(null);
            setData({ ...data, flightData: { ...data.flightData, flightStatus: status } });
        } catch (error) {
            setError(error?.toString() ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
    }


    const isGateUpdateDisabled = () => {
        if (gate.trim() === "" || gate.trim() === data.flightData.gateNumber) {
            return true;
        }
        return false;
    }

    const onGateStatusClicked = async () => {
        if (flightId == null || isGateUpdateDisabled()) {
            return;
        }
        try {
            setLoading(true);
            await FlightService.updateGateStatus(flightId, gate);
            setStatus(null);
            setData({ ...data, flightData: { ...data.flightData, gateNumber: gate } });
        } catch (error) {
            setError(error?.toString() ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Flight flight={data.flightData} canBookFlight={false} canUpdateStatus={false} />
            <p className="text-white mt-4 text-xl">Update Flight Status</p>
            <div className="flex gap-4 mt-2">
                <DropDown
                    title="Flight Status"
                    dropDownOption={[
                        {
                            name: FlightStatus.CANCELLED,
                            onSelected: () => setStatus(FlightStatus.CANCELLED)
                        }, {
                            name: FlightStatus.DELAYED,
                            onSelected: () => setStatus(FlightStatus.DELAYED)
                        }, {
                            name: FlightStatus.ON_TIME,
                            onSelected: () => setStatus(FlightStatus.ON_TIME)
                        },
                    ]}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 inline-flex items-center"
                />
                <button disabled={isUpdateDisabled()} onClick={onUpdateStatusClicked} className={`${isUpdateDisabled() ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded mt-4`}>
                    Update Status to {status ?? data.flightData.flightStatus}
                </button>
            </div>
            <p className="text-white mt-4 text-xl">Update Gate Status</p>
            <div className="flex gap-4 mt-2">
                <input type="text" value={gate} onChange={(e) => setGate(e.target.value)} />
                <button disabled={isGateUpdateDisabled()} onClick={onGateStatusClicked} className={`${isGateUpdateDisabled() ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded mt-4`}>
                    Update Gate to {gate ?? data.flightData.gateNumber}
                </button>
            </div>
        </div>
    )
}

export default UpdateFlight;