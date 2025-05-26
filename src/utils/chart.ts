const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        font: {
          family: "Inter",
          size: 14,
        },
      },
    },
    tooltip: {
      mode: "index" as const,
      intersect: false,
      bodyFont: {
        family: "Inter",
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Date",
        font: {
          family: "Inter",
          size: 14,
        },
      },
    },
    y: {
      title: {
        display: true,
        text: "Concentration (µg/m³)",
        font: {
          family: "Inter",
          size: 14,
        },
      },
    },
  },
};

export {chartOptions}