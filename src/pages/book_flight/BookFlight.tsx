import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TicketService from '../../redux/service/ticket.service';
import FlightService from '../../redux/service/flight.service';
import BookFlightData from './BookFlightData';
import FlightResponse from '../../redux/model/flight/FlightResponse';
import Flight from '../../components/flights/flight/Flight';
import Styles from './BookFlight.module.scss';

import SeatIcon from "../../assets/images/seat.svg";
import SeatFilledIcon from "../../assets/images/seat_filled.svg";
import SeatSelectedIcon from "../../assets/images/seat_selected.svg";
import BuyTicketRequest from '../../redux/model/flight/ticket/BuyTicketRequest';

const BookFlight = () => {

    const flightId = useParams().id;
    const [data, setData] = useState<BookFlightData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selected, setSelected] = useState<number | null>(null);

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

    return (
        <div>
            <Flight flight={data.flightData} canBookFlight={false} />
            <button onClick={buyTicket} disabled={selected == null} className={`${selected ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-500"} text-white font-bold py-2 px-4 rounded mt-4`}>Buy Seat for ${data.flightData.price}</button>
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