import { useState } from "react";
import { Line } from "react-chartjs-2";
import { useOpenAQHistoricalData } from "../hooks/useOpenAqHistoricData";
import LoadingSpinner from "./Loading";
import { format } from "date-fns";
import { chartOptions } from "../utils/chart";
import ErrorAlert from "./Error";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";
import { useApp } from "../context/AppProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function HistoricalData() {
  const [timeRange, setTimeRange] = useState<"7" | "30">("7");
  const { error, selectedStation,isLoading } = useApp();
  const no2SensorId = selectedStation?.no2SensorId || null;
  const o3SensorId = selectedStation?.o3SensorId || null;
  const { fromDate, toDate } = useMemo(() => {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - parseInt(timeRange));
    return { fromDate: from, toDate: to };
  }, [timeRange]);

  const { no2Data, o3Data } = useOpenAQHistoricalData(
    fromDate,
    toDate,
    no2SensorId,
    o3SensorId
  );
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, "MMM d");
  };
  const labels = useMemo(
    () => no2Data.map((d) => formatDate(d.period.datetimeFrom.local)),
    [no2Data]
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "NO2 (µg/m³)",
        data: no2Data.map((d) => d.value),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: false,
        tension: 0.4,
      },
      {
        label: "O3 (µg/m³)",
        data: o3Data.map((d) => d.value),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!no2Data || no2Data.length === 0 || !o3Data || o3Data.length === 0){
    return (
      <div className="bg-gray-50 p-4 rounded-lg text-center" role="alert" aria-live="polite">
        <p className="text-sm sm:text-base text-gray-900">
          No historical data available for this station.
        </p>
      </div>
    )
  }
    

  return (
    <div
      className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
      role="region"
      aria-label="Historical air quality trends"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Historical Air Quality Trends
        </h2>
        <div className="flex space-x-2" role="tablist">
          <button
            onClick={() => setTimeRange("7")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              timeRange === "7"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white"
            } focus:outline-none focus:ring-2 focus:ring-green-500`}
            role="tab"
            aria-selected={timeRange === "7"}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeRange("30")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              timeRange === "30"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white"
            } focus:outline-none focus:ring-2 focus:ring-green-500`}
            role="tab"
            aria-selected={timeRange === "30"}
          >
            30 Days
          </button>
        </div>
      </div>
      <div
        className="min-h-[300px] max-h-[500px] w-full transition-opacity duration-300"
        aria-label="Air quality trend chart"
      >
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default HistoricalData;
