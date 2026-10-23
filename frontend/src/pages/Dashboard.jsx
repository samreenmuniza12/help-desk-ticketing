import { useEffect, useState } from "react";
import { getTickets } from "../services/ticketService";
import TicketForm from "../components/TicketForm";

function Dashboard() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadTickets() {
            try{
              const data = await getTickets();
              setTickets(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
      loadTickets();  
    }, []);

    async function hancleCreate(ticketData) {
       try{
        const newTicket = await createTicket(ticketData);
        setTickets([newTicket, ...tickets]);
       }
       catch (err) {
        setError(err.message);
       }
    }
if (loading) return <p>Loading tickets...</p>
if (error) return <p> Error: {error}</p>;

return (
    <div>
        <TicketForm onCreate={handleCreate} />
        <h2>Tickets ({tickets.length})</h2>
        {tickets.map((ticket) => (
            <div key={ticket._id}>
                <h3>{ticket.title}</h3>
                <p>{ticket.description}</p>
                <small>Status: {ticket.status}</small>
            </div>
        ))}
    </div>
);
}
export default Dashboard;



