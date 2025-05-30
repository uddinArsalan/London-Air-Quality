import { getHealthIndicator } from "../utils/airQuality";
import type { StationReadingsType } from "../types";
import { format } from "date-fns";

interface SensorCardProps {
  data: StationReadingsType;
  parameter: string;
  unit: string | undefined;
}

export default function SensorCard({ data, parameter, unit }: SensorCardProps) {
  const indicator = getHealthIndicator(parameter, data.value);
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy, h:mm a");
  };
  return (
    <div
      className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
      role="region"
      aria-label={`${parameter} reading`}
    >
      <h2 className="text-lg font-semibold text-gray-900">
        {parameter.toUpperCase()}
      </h2>
      <p
        className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2"
        aria-live="polite"
      >
        {data.value} {unit}
      </p>
      <p className="text-xs text-gray-600 mt-1">
        Last Updated: {formatDate(data.datetime.utc)}
      </p>
      <span
        className={`inline-block mt-3 px-4 py-1.5 rounded-full text-sm font-medium text-black ${indicator.color}`}
        aria-label={`Air quality: ${indicator.label}`}
      >
        {indicator.label}
      </span>
    </div>
  );
}
