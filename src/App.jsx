import { useState } from "react";
import { Switch, Route } from "wouter";
import { useTheme } from "./contexts/theme-context.jsx";
import Sidebar from "./components/layout/sidebar.jsx";
import Header from "./components/layout/header.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Tables from "./pages/tables.jsx";
import Charts from "./pages/charts.jsx";
import Calendar from "./pages/calendar.jsx";
import Kanban from "./pages/kanban.jsx";
import NotFound from "./pages/not-found.jsx";

function Router({ theme }) {
  return (
    <Switch>
      <Route path="/" component={() => <Dashboard theme={theme} />} />
      <Route path="/dashboard" component={() => <Dashboard theme={theme} />} />
      <Route path="/tables" component={() => <Tables theme={theme} />} />
      <Route path="/charts" component={() => <Charts theme={theme} />} />
      <Route path="/calendar" component={() => <Calendar theme={theme} />} />
      <Route path="/kanban" component={() => <Kanban theme={theme} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { theme } = useTheme();  // now safe, because ThemeProvider will wrap App

  return (
    <div className="flex h-screen overflow-hidden bg-white text-gray-900" style={{backgroundColor : "var(--background)"}}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Router theme={theme} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
