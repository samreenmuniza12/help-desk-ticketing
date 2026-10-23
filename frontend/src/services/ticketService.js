const API_URL = import.meta.env.VITE_API_URL;

export async function getTickets() {
  const response = await fetch(`${API_URL}/tickets`);
  if(!response.ok) {
    throw new Error("Failed to fetch tickets");
  }
  return response.json();
}