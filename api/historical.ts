import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { sensors_id, datetime_to, datetime_from } = _req.query;
    if (!sensors_id || !datetime_from || !datetime_to) {
      return res
        .status(400)
        .json({ message: "Missing required query parameters" });
    }
    const url = `${process.env.API_BASE_URL}/sensors/${sensors_id}/measurements?datetime_from=${datetime_from}&datetime_to=${datetime_to}&limit=1000`;
    const response = await axios.get(url, {
      headers: {
        "x-api-key": process.env.OPENAQ_API_KEY,
        "Content-Type": "application/json",
      },
    });
    res.json({ message: "Success", data: response.data });
  } catch (error: unknown) {
    console.error("Error fetching OpenAQ historical data:", error);
    res.status(500).json({
      message: "Failed to fetch OpenAQ historical data",
      error: (error as Error).message,
    });
  }
}
