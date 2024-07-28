import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TicketService from '../../redux/service/ticket.service';
import FlightService from '../../redux/service/flight.service';
import BookFlightData from './BookFlightData';
import FlightResponse, { FlightStatus } from '../../redux/model/flight/FlightResponse';
import Flight from '../../components/flights/flight/Flight';
import Styles from './BookFlight.module.scss';

import SeatIcon from "../../assets/images/seat.svg";
import SeatFilledIcon from "../../assets/images/seat_filled.svg";
import SeatSelectedIcon from "../../assets/images/seat_selected.svg";
import BuyTicketRequest from '../../redux/model/ticket/BuyTicketRequest';
import { useSelector } from 'react-redux';
import DropDown from '../../components/dropdown/DropDown';
import UserRole from '../../redux/model/user/UserRole';
import { authSelector } from '../../redux/reducer/auth.reducer';

const BookFlight = () => {

    const flightId = useParams().id;
    const [data, setData] = useState<BookFlightData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selected, setSelected] = useState<number | null>(null);
    const [status, setStatus] = useState<FlightStatus | null>(null);
    const { user } = useSelector(authSelector);

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
            console.log(tickets);
        }).catch((error) => {
            setError(error?.toString() ?? "Something went wrong");
        }).finally(() => {
            setLoading(false);
        });
    }, [flightId]);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error || data == null) {
        return <p>{error ?? "Something went wrong"}</p>
    }

    const getIcon = (seat: number) => {
        if (data.seatsBooked.includes(seat)) {
            return SeatFilledIcon;
        }
        if (selected === seat) {
            return SeatSelectedIcon;
        }
        return SeatIcon;
    }

    const selecteSeat = (seat: number) => {
        if (data.seatsBooked.includes(seat)) {
            return SeatFilledIcon;
        }
        if (selected === seat) {
            setSelected(null);
        } else {
            setSelected(seat);
        }
    }

    const buyTicket = async () => {
        if (selected == null || flightId == null) {
            return;
        }
        try {
            setLoading(true);
            const request: BuyTicketRequest = { flightId: Number.parseInt(flightId), seatNumber: selected }
            await TicketService.buyTicket(request);
            setData({ ...data, seatsBooked: [...data.seatsBooked, selected] });
        } catch (error) {
            setError(error?.toString() ?? "Something went wrong");
        } finally {
            setSelected(null);
            setLoading(false);
        }
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

    const isUpdateDisabled = () => {
        if (status == null || status === data.flightData.flightStatus) {
            return true;
        }
        return false;
    }

    return (
        <div>
            <Flight flight={data.flightData} canBookFlight={false} />
            <button onClick={buyTicket} disabled={selected == null} className={`${selected ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-500"} text-white font-bold py-2 px-4 rounded mt-4`}>Buy Seat for Rs.{data.flightData.price}</button>
            {
                user?.role === UserRole.ADMIN && <div className="flex gap-4 mt-4">
                    <DropDown
                        title="Upload"
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
            }
            <div className={Styles.grid}>
                {
                    Array.from(Array(data?.flightData?.seatCount ?? 0), (_, i) => {
                        return <img key={i} onClick={() => selecteSeat(i)} className={Styles.seat + (getIcon(i) === SeatFilledIcon ? '' : ' cursor-pointer')} src={getIcon(i)} alt="seat" />
                    })
                }
            </div>
        </div>
    )
}

export default BookFlight;