import { useState } from "react";
import { login, register } from "../services/authService";

function AuthPage({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const user =
        mode === "login"
          ? await login(email, password)
          : await register(name, email, password);
      onAuth(user);
    } catch (err) {
      setError(err.message);
    }
  }

  const inputClass =
    "mb-3 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <div className="mx-auto max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">
        {mode === "login" ? "Log in" : "Create account"}
      </h2>
      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className={inputClass}
          />
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={inputClass}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 6 characters)"
          className={inputClass}
        />
        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {mode === "login" ? "Log in" : "Sign up"}
        </button>
      </form>
      <button
        onClick={() => {
          setMode(mode === "login" ? "register" : "login");
          setError("");
        }}
        className="mt-4 text-sm text-blue-600 hover:underline"
      >
        {mode === "login"
          ? "No account? Sign up"
          : "Already have an account? Log in"}
      </button>
    </div>
  );
}

export default AuthPage;