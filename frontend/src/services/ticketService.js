const API_URL = import.meta.env.VITE_API_URL;

export async function getTickets() {
  const response = await fetch(`${API_URL}/tickets`);
  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }
  return response.json();
}

export async function createTicket(ticket) {
  const response = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });
  if (!response.ok) {
    throw new Error("Failed to create ticket");
  }
  return response.json();
}