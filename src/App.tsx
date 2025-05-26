import { Routes, Route, NavLink } from "react-router-dom";
import StationSelector from "./components/StationSelector";
import CurrentReadings from "./components/CurrentReading";
import HistoricalData from "./components/HistoricalData";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header
        className="bg-green-800 bg-opacity-90 text-white py-4 px-6 border-b border-green-900 shadow-sm"
        role="banner"
        aria-label="London Air Quality Monitor"
      >
        <h1 className="text-xl font-bold text-center sm:text-2xl">
          London Air Quality Monitor
        </h1>
      </header>
      <main className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <StationSelector />
        <nav
          className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 mb-6 border-b border-gray-200 pb-2"
          role="navigation"
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? "bg-green-100 text-green-700 border-b-2 border-green-600"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-600"
              } focus:outline-none focus:ring-2 focus:ring-green-500`
            }
          >
            Current Readings
          </NavLink>
          <NavLink
            to="/historical"
            className={({ isActive }) =>
              `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? "bg-green-100 text-green-700 border-b-2 border-green-600"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-600"
              } focus:outline-none focus:ring-2 focus:ring-green-500`
            }
          >
            Historical Data
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<CurrentReadings />} />
          <Route path="/historical" element={<HistoricalData />} />
          <Route path="*" element={<p className="text-gray-600 text-center">Page not found</p>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
