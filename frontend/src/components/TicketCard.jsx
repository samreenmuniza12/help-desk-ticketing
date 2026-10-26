function TicketCard({ ticket, onStatusChange, onDelete }) {
  return (
    <div>
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <select
        value={ticket.status}
        onChange={(e) => onStatusChange(ticket._id, e.target.value)}
      >
        <option value="open">Open</option>
        <option value="in progress">In progress</option>
        <option value="closed">Closed</option>
      </select>
      <button onClick={() => onDelete(ticket._id)}>Delete</button>
    </div>
  );
}

export default TicketCard;