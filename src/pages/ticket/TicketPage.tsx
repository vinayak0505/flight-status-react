import { useEffect } from "react";
import Ticket from "../../components/ticket/Ticket";
import { authSelector } from "../../redux/reducer/auth.reducer";
import { useSelector } from "react-redux";
import { getAllTickets, ticketSelector } from "../../redux/reducer/ticket.reducer";
import { useAppDispatch } from "../../redux/store";

const TicketPage = () => {

    const { user } = useSelector(authSelector);
    const { tickets, loading, error } = useSelector(ticketSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user == null) {
            return;
        }
        dispatch(getAllTickets())
    }, [user, dispatch]);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error || user == null) {
        return <div>{error ?? "No user found"}</div>
    }


    return (
        <div className={"flex flex-col gap-3"}>
            {
                tickets?.map((ticket, i) => <Ticket key={i} ticket={ticket} fullName={user.fullName ?? ""} />)
            }
        </div>
    );
};
export default TicketPage;