import LoadingSpinner from "./Loading";
import ErrorAlert from "./Error";
import type { StationReadingsType } from "../types";
import { useApp } from "../context/AppProvider";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import SensorCard from "./SensorCard";

function CurrentReadings() {
  const { isLoading, setIsLoading, setError, selectedStation, error } =
    useApp();
  const [stationReadings, setStationReadings] = useState<StationReadingsType[]>(
    []
  );

  useEffect(() => {
    const fetchStationReadings = async () => {
      if (!selectedStation) return;
      try {
        setIsLoading(true);
        setError(null);
        const res = await axios.get(
          `/api/stationInfo?stationId=${selectedStation.id}`
        );
        console.log("Fetched station readings:", res.data.data);
        setStationReadings(res.data.data);
      } catch (err: unknown) {
        console.error("Error fetching station readings:", err);
        setError("Failed to fetch station readings");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStationReadings();
  }, [selectedStation]);

  const no2Data = useMemo(
    () =>
      stationReadings.find(
        (data) => data.sensorsId === selectedStation?.no2SensorId
      ),
    [stationReadings, selectedStation]
  );
  const o3Data = useMemo(
    () =>
      stationReadings.find(
        (data) => data.sensorsId === selectedStation?.o3SensorId
      ),
    [stationReadings, selectedStation]
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  if (!no2Data && !o3Data) {
    return (
      <div
        className="bg-gray-50 p-4 rounded-lg text-center"
        role="alert"
        aria-live="polite"
      >
        <p className="text-sm sm:text-base text-gray-900">
          No readings available for this station.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {no2Data && (
          <SensorCard
            data={no2Data}
            parameter="no2"
            unit={
              selectedStation?.sensors.find(
                (sensor) => sensor.id === no2Data.sensorsId
              )?.parameter.units
            }
          />
        )}
        {o3Data && (
          <SensorCard
            data={o3Data}
            parameter="o3"
            unit={
              selectedStation?.sensors.find(
                (sensor) => sensor.id === o3Data.sensorsId
              )?.parameter.units
            }
          />
        )}
      </div>
    </div>
  );
}

export default CurrentReadings;
