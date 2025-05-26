import { createContext, useContext, useEffect, useState } from "react";
import { type AppProviderInterface, type StationType } from "../types";
import axios from "axios";
import Loader from "../components/Loader";

const AppContext = createContext<AppProviderInterface>({
  stations: [],
  isLoading: false,
  error: null,
  selectedStation: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedStation: (_station: StationType | null) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsLoading: (_loading: boolean) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setError: (_error: string | null) => {},
});

export function useApp() {
  return useContext(AppContext);
}

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stations, setStations] = useState<StationType[]>([]);
  const [isStationsLoading,setIsStationsLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<StationType | null>(
    null
  );

  useEffect(() => {
      const fetchStations = async () => {
        try {
          setIsStationsLoading(true);
          setError(null);
          const res = await axios.get("/api/openaqstations");
          console.log(res.data.data.results)
          setStations(res.data.data.results);
        } catch (err: unknown) {
          console.error("Error fetching stations:", err);
          setError("Failed to fetch stations");
        }finally {
          setIsStationsLoading(false);
        } 
      };
      fetchStations();
    }, []);

  return (
    <AppContext.Provider
      value={{
        stations,
        isLoading,
        error,
        selectedStation,
        setSelectedStation,
        setIsLoading,
        setError,
      }}
    >
      {children}
      {isStationsLoading && <Loader />}
    </AppContext.Provider>
  );
}
