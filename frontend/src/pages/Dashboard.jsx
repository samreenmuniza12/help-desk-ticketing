import { useState, useEffect } from "react";
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../services/ticketService";
import TicketForm from "../components/TicketForm";
import TicketCard from "../components/TicketCard";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTickets() {
      try {
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

  async function handleCreate(ticketData) {
    try {
      const newTicket = await createTicket(ticketData);
      setTickets([newTicket, ...tickets]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleStatusChange(id, status) {
    try {
      const updated = await updateTicket(id, { status });
      setTickets(tickets.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTicket(id);
      setTickets(tickets.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

    if (loading) return <p className="text-slate-500">Loading tickets...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div>
      <TicketForm onCreate={handleCreate} />
      <h2 className="mb-4 text-lg font-semibold text-slate-900">
        Tickets ({tickets.length})
      </h2>
      <div className="space-y-3">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket._id}
            ticket={ticket}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;