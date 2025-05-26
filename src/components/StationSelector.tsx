import { useApp } from "../context/AppProvider";

function StationSelector() {
  const { stations, setSelectedStation, selectedStation } = useApp();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const station = stations.find((s) => s.id === selectedId);
    if (station) {
      setSelectedStation(station);
    }
  };
  if (!stations || stations.length === 0) {
    return (
      <p className="text-gray-600 text-sm mb-6">
        No stations available. Please try again later.
      </p>
    );
  }

  return (
    <div className="mb-8">
      <label
        htmlFor="station-select"
        className="block text-sm font-semibold text-gray-900 mb-2"
      >
        Select Monitoring Station
      </label>
      <select
        id="station-select"
        value={selectedStation?.id || ""}
        onChange={handleChange}
        className="block w-full sm:w-80 p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400"
        aria-describedby="station-select-desc"
      >
        <option value="" disabled>
          Select a station
        </option>
        {stations.map((station) => (
          <option key={station.id} value={station.id}>
            {station.name}
          </option>
        ))}
      </select>
      <p id="station-select-desc" className="text-xs text-gray-500 mt-1">
        Choose a London air quality monitoring station to view its data.
      </p>
    </div>
  );
}

export default StationSelector;
