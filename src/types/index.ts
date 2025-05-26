export interface SensorType {
  id: number;
  name: string;
  parameter: {
    id: number;
    name: string;
    units: string;
    displayName: string;
  };
}

interface DateTimeType {
  utc: string;
  local: string;
}

export interface StationType {
  id: number;
  name: string;
  country: string;
  locality?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  sensors: SensorType[];
  datetimeFirst: DateTimeType;
  datetimeLast: DateTimeType;
  no2SensorId : number;
  o3SensorId : number;
}

export interface StationReadingsType {
  sensorsId: number;
  datetime: DateTimeType;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  value: number;
  locationsId : number;
} 

export interface AppProviderInterface {
  stations: StationType[];
  isLoading: boolean;
  error: string | null;
  selectedStation: StationType | null;
  setSelectedStation: (station: StationType) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export interface HistoricalDataPoint {
  value: number;
  flagInfo: {
    hasFlags: boolean;
  };
  parameter: {
    id: number;
    name: string;
    units: string;
    displayName: string | null;
  };
  period: { 
    label: string;
    interval: string;
    datetimeFrom: DateTimeType;
    datetimeTo: DateTimeType;
  };
  coordinates: null | {
    latitude: number;
    longitude: number;
  };
  summary: null | {
    count: number;
    mean: number;
    min: number;
    max: number;
    percentComplete: number;
    percentCoverage: number;
    datetimeFrom: DateTimeType;
    datetimeTo: DateTimeType;
  };
  coverage: {
    expectedCount: number;
    expectedInterval: string;
    observedCount: number;
    observedInterval: string;
    percentComplete: number;
    percentCoverage: number;
    datetimeFrom: DateTimeType;
    datetimeTo: DateTimeType;
  };
}