const NO2_THRESHOLDS = {
  GOOD: { max: 40, color: "bg-green-100 text-green-800", label: "Good" },
  MODERATE: {
    max: 200,
    color: "bg-yellow-100 text-yellow-800",
    label: "Moderate",
  },
  UNHEALTHY: {
    max: Infinity,
    color: "bg-red-100 text-red-800",
    label: "Unhealthy",
  },
};

const O3_THRESHOLDS = {
  GOOD: { max: 100, color: "bg-green-100 text-green-800", label: "Good" },
  MODERATE: {
    max: 160,
    color: "bg-yellow-100 text-yellow-800",
    label: "Moderate",
  },
  UNHEALTHY: {
    max: Infinity,
    color: "bg-red-100 text-red-800",
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
