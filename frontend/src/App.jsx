import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import { getStoredUser, logout } from "./services/authService";

function App() {
  const [user, setUser] = useState(getStoredUser());

  function handleLogout() {
    logout();
    setUser(null);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold text-slate-900">Help Desk</h1>
          {user && (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-slate-600">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">
        {user ? <Dashboard /> : <AuthPage onAuth={setUser} />}
      </main>
    </div>
  );
}

export default App;