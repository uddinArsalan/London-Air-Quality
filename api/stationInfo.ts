import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const stationId = _req.query.stationId as string;
    const response = await axios.get(
      `${process.env.API_BASE_URL}/locations/${stationId}/latest`,
      {
        headers: {
          "x-api-key": process.env.OPENAQ_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ message: "Success", data: response.data.results });
  } catch (error: unknown) {
    res.status(500).json({ message: "Error", error: (error as Error).message });
    console.log("Error:", error);
  }
}
