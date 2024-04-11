import { getWeather } from "@/lib/data";

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const lon = searchParams.get("lon");
  const lat = searchParams.get("lat");
  const units = searchParams.get("units");

  try {
    const weather = await getWeather(lat, lon, units);
    return Response.json(weather, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};
