const statusStyles = {
  open: "bg-green-100 text-green-800",
  "in progress": "bg-amber-100 text-amber-800",
  closed: "bg-slate-200 text-slate-700",
};
const priorityStyles = {
  low: "text-slate-500",
  medium: "text-amber-500",
  high: "text-red-500",
}

function TicketCard({ ticket, onStatusChange, onDelete }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-medium text-slate-900">{ticket.title}</h3>
          {ticket.description && (
            <p className="mt-1 text-sm text-slate-600">{ticket.description}</p>
          )}
          <p className={`mt-2 text-xs font-medium ${priorityStyles[ticket.priority]}`}>
            {ticket.priority} priority
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[ticket.status]}`}
        >
          {ticket.status}
        </span>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <select
          value={ticket.status}
          onChange={(e) => onStatusChange(ticket._id, e.target.value)}
          className="rounded-md border border-slate-300 px-2 py-1 text-sm"
        >
          <option value="open">Open</option>
          <option value="in progress">In progress</option>
          <option value="closed">Closed</option>
        </select>
        <button
          onClick={() => onDelete(ticket._id)}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TicketCard;