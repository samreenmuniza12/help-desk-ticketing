import { getToken } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

export async function getTickets() {
  const response = await fetch(`${API_URL}/tickets`, {
    headers: authHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }
  return response.json();
}

export async function createTicket(ticket) {
  const response = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(ticket),
  });
  if (!response.ok) {
    throw new Error("Failed to create ticket");
  }
  return response.json();
}

export async function updateTicket(id, updates) {
  const response = await fetch(`${API_URL}/tickets/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error("Failed to update ticket");
  }
  return response.json();
}

export async function deleteTicket(id) {
  const response = await fetch(`${API_URL}/tickets/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to delete ticket");
  }
  return response.json();
}