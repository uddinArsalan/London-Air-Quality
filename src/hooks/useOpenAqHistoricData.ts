import axios from "axios";
import { useEffect, useState } from "react";
import type { HistoricalDataPoint } from "../types";
import { useApp } from "../context/AppProvider";

const useOpenAQHistoricalData = (
  fromDate: Date,
  toDate: Date,
  no2SensorId: number | null,
  o3SensorId: number | null
) => {
  const {setError,setIsLoading}= useApp();
  const [no2Data, setNo2Data] = useState<HistoricalDataPoint[]>([]);
  const [o3Data, setO3Data] = useState<HistoricalDataPoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!no2SensorId || !o3SensorId) return;
      setIsLoading(true);
      setError(null);
      try {
        const [no2Res, o3Res] = await Promise.all([
          axios.get("/api/historical", {
            params: {
              sensors_id: no2SensorId,
              datetime_from: fromDate.toISOString(),
              datetime_to: toDate.toISOString(),
            },
          }),
          axios.get("/api/historical", {
            params: {
              sensors_id: o3SensorId,
              datetime_from: fromDate.toISOString(),
              datetime_to: toDate.toISOString(),
            },
          }),
        ]);
        setNo2Data(no2Res.data.data.results);
        setO3Data(o3Res.data.data.results);
      } catch (err: unknown) {
        setError((err as Error).message || "Failed to fetch historical data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [no2SensorId, o3SensorId, fromDate, toDate]);

  return { no2Data, o3Data };
};

export {useOpenAQHistoricalData}