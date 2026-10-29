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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const visibleTickets = tickets.filter((ticket) => {
    const matchesStatus = 
       statusFilter === "all" || ticket.status === statusFilter;
       const matchesSearch= ticket.title
       .toLowerCase()
       .includes(search.toLowerCase());
       return matchesStatus && matchesSearch;
  });

  if (loading) return <p className="text-slate-500">Loading tickets...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  return (
    <div>
      <TicketForm onCreate={handleCreate} />

      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">
          Tickets ({visibleTickets.length})
        </h2>
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tickets..."
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-slate-300 px-2 py-1.5 text-sm"
          >
            <option value="all">All statuses</option>
            <option value="open">Open</option>
            <option value="in progress">In progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {visibleTickets.length === 0 && (
        <p className="text-sm text-slate-500">No tickets found.</p>
      )}

      <div className="space-y-3">
        {visibleTickets.map((ticket) => (
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