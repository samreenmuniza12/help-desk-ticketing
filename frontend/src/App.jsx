import React from 'react';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <div className="min-h-screen bg-slate-50">
       <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-3xl px-4 py-4">
              <h1 className="text-xl font-semibold text-slate-900">Help Desk</h1>
          </div>
       </header>
       <main className="mx-auto max-w-3xl px-4 py-8">
           <Dashboard />
       </main>
    </div>
  );
}

export default App;