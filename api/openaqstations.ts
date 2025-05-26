import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { StationType } from "../src/types";
import axios from "axios";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const response = await axios.get(
      `${process.env.API_BASE_URL}/locations?bbox=-0.5103,51.2868,0.3340,51.6919&iso=GB&limit=1000&sort_order=desc&parameters_id=3&parameters_id=5`,
      {
        headers: {
          "x-api-key": process.env.OPENAQ_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const validStations = response.data.results
      .map((station: StationType) => {
        const sensors = station.sensors;

        const no2Sensor = sensors.find(
          (sensor) => sensor.parameter.name.toLowerCase() === "no2"
        );
        const o3Sensor = sensors.find(
          (sensor) => sensor.parameter.name.toLowerCase() === "o3"
        );

        const lastDate = new Date(station.datetimeLast.utc);
        const isRecent =
          lastDate > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        const hasBoth = no2Sensor && o3Sensor;

        if (hasBoth && isRecent) {
          return {
            ...station,
            no2SensorId: no2Sensor.id,
            o3SensorId: o3Sensor.id,
          };
        }

        return null;
      })
      .filter(Boolean);
    console.log("Valid Stations:", validStations.length);
    res.json({
      message: "Success",
      data: {
        meta: response.data.meta,
        results: validStations,
      },
    });
  } catch (error: unknown) {
    res.status(500).json({ message: "Error", error: (error as Error).message });
    console.error("Error:", error);
  }
}
