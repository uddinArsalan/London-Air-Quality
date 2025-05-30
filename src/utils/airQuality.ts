const NO2_THRESHOLDS = {
  GOOD: { max: 40, color: "bg-green-300 text-black", label: "Good" },
  MODERATE: {
    max: 200,
    color: "bg-yellow-300 text-black",
    label: "Moderate",
  },
  UNHEALTHY: {
    max: Infinity,
    color: "bg-red-500 text-white",
    label: "Unhealthy",
  },
};

const O3_THRESHOLDS = {
  GOOD: { max: 100, color: "bg-green-400 text-black", label: "Good" },
  MODERATE: {
    max: 160,
    color: "bg-yellow-100 text-black",
    label: "Moderate",
  },
  UNHEALTHY: {
    max: Infinity,
    color: "bg-red-500 text-white",
    label: "Unhealthy",
  },
};

const getHealthIndicator = (parameter: string, value: number) => {
  if (!parameter || value < 0 || isNaN(value)) {
    return { color: "bg-gray-100 text-gray-800", label: "Unknown" };
  }
  const thresholds =
    parameter.toLowerCase() === "no2" ? NO2_THRESHOLDS : O3_THRESHOLDS;

  if (value <= thresholds.GOOD.max) {
    return {
      color: thresholds.GOOD.color,
      label: thresholds.GOOD.label,
    };
  } else if (value <= thresholds.MODERATE.max) {
    return {
      color: thresholds.MODERATE.color,
      label: thresholds.MODERATE.label,
    };
  } else {
    return {
      color: thresholds.UNHEALTHY.color,
      label: thresholds.UNHEALTHY.label,
    };
  }
};

export { getHealthIndicator };
