const API_URL = import.meta.env.VITE_API_URL;

export function getToken() {
    return localStorage.getItem("token");
}

export function getStoredUser() {
    const user = localStorage.getItem("user");
    return user ?  JSON.parse(user) : null;
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

async function authRequest(path, body) {
    const response = await fetch(`{$API_URL}/auth/${path}`, {
        method: "POST",
        headers: {"Content-Type":  "application/json"},
        body: JSON.stringify(body),
    });
    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
}

export function login(email, password) {
    return authRequest("login", { email, password });
}

export function register(name, email, password) {
    return authRequest("register", { name, email, password });
}