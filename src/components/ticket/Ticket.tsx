import { useMemo } from "react";
import TicketResponse from "../../redux/model/ticket/TicketResponse";
import Styles from "./Ticket.module.scss";

const Ticket = ({ ticket, fullName }: { ticket: TicketResponse, fullName: string }) => {

    const barcode_url = useMemo(() => {
        return `${process.env.REACT_APP_BARCODE_URL}${ticket.userId}_${ticket.flight.id}_${ticket.seatNumber}`;
    }, [ticket]);

    const boarding_till = useMemo(() => {
        const date = new Date(ticket.flight.departureDate);
        // setting time to 2 hours earlier
        date.setHours(date.getHours() - 2);
        const time = date.toLocaleTimeString().split(":");
        return `${time[0]}-${time[1]}`;
    }, [ticket]);

    const ticket_id = useMemo(() => {
        return `${ticket.userId}_${ticket.flight.id}_${ticket.seatNumber}`;
    }, [ticket]);

    const boarding_date = useMemo(() => {
        // get only data
        const newdate = new Date(ticket.flight.departureDate);
        return newdate.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: '2-digit'
          }).replace(/ /g, ' ');          
    }, [ticket]);

    return (
        <div className={Styles.ticket_transition}>
            <div className={Styles.ticket}>
                <div className={Styles.barcode_container}>
                    <img className={Styles.barcode} src={barcode_url} alt="ticket barcode" />
                    <div className={Styles.color}>
                        <div className={Styles.boarding_till}>
                            <div className={Styles.title}>Boarding Till</div>
                            <div className={Styles.content}>{boarding_till}</div>
                            <div className={Styles.title}>{ticket_id}</div>
                        </div>
                    </div>
                </div>

                <div className={Styles.boarding_pass}>
                    <div className={Styles.header}>
                        <img className={Styles.logo} src="./images/logo.png" alt="logo" />
                        <div className={Styles.title}>Boarding Pass</div>
                    </div>
                    <div className={Styles.body}>
                        <div>
                            <div className={Styles.content_title}>Name of passenger</div>
                            <div className={Styles.content}>{fullName}</div>
                        </div>
                        <div>
                            <div className={Styles.content_title}>From</div>
                            <div className={Styles.content}>{ticket.flight.source}</div>
                        </div>
                        <div>
                            <div className={Styles.content_title}>To</div>
                            <div className={Styles.content}>{ticket.flight.destination}</div>
                        </div>
                        <div className={Styles.footer}>
                            <div className={Styles.item}>
                                <div className={Styles.title}>Gate</div>
                                <div className={Styles.content}>{ticket.flight.gateNumber}</div>
                            </div>
                            <div className={Styles.item}>
                                <div className={Styles.title}>Date</div>
                                <div className={Styles.content}>{boarding_date}</div>
                            </div>
                            <div className={Styles.item}>
                                <div className={Styles.title}>Flight</div>
                                <div className={Styles.content}>{ticket.flight.flightNumber}</div>
                            </div>
                            <div className={Styles.seat}>
                                <div className={Styles.title}>Seat</div>
                                <div className={Styles.content}>{ticket.seatNumber}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={Styles.ticket_content}>
                    <div className={Styles.company_name}>Indigo</div>
                    <div className={Styles.bottom}>
                        <div className={Styles.content_title}>Name of passenger</div>
                        <div className={Styles.content}>{fullName}</div>
                        <div className={Styles.content_title}>From</div>
                        <div className={Styles.content}>{ticket.flight.source}</div>
                        <div className={Styles.content_title}>To</div>
                        <div className={Styles.content}>{ticket.flight.destination}</div>

                        <div className={Styles.footer}>
                            <div className={Styles.item}>
                                <div className={Styles.title}>Gate</div>
                                <div className={Styles.content}>{ticket.flight.gateNumber}</div>
                            </div>
                            <div className={Styles.divider}></div>
                            <div className={Styles.item}>
                                <div className={Styles.title}>Date</div>
                                <div className={Styles.content}>{boarding_date}</div>
                            </div>
                            <div className={Styles.divider}></div>
                            <div className={Styles.item}>
                                <div className={Styles.title}>Flight</div>
                                <div className={Styles.content}>{ticket.flight.flightNumber}</div>
                            </div>
                        </div>
                        <div className={Styles.boarding}>
                            <div className={Styles.boarding_till}>
                                <div className={Styles.title}>Boarding Till</div>
                                <div className={Styles.content}>{boarding_till}</div>
                            </div>
                            <div className={Styles.seat}>
                                <div className={Styles.title}>Seat</div>
                                <div className={Styles.content}>{ticket.seatNumber}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default Ticket;