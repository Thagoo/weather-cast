import { getAirPollution, getWeather, getforecast } from "@/lib/data";
import CurrentWeather from "@/ui/current-weather";
import Forecast from "@/ui/fiveday-forecast";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/ui/map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default async function WeatherForecast({
  searchParams,
}: {
  searchParams: {
    lat: number;
    lon: number;
    units: "metric" | "imperial" | "standard";
  };
}) {
  const { lat, lon, units } = searchParams;
  let unitSystem =
    units === "standard" || units === "imperial" || units === "metric"
      ? units
      : "metric";

  const weather = await getWeather(lat, lon, unitSystem);
  const forecast = await getforecast(lat, lon, unitSystem);
  const airPollution = await getAirPollution(lat, lon, unitSystem);

  if (!weather.main) {
    throw new Error(weather.message);
  }
  return (
    <div className="flex flex-col gap-4 px-2 md:px-48">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <CurrentWeather
          weather={weather}
          units={unitSystem}
          airPollution={airPollution.list[0]}
        />

        <Forecast forecast={forecast} />
      </div>
      <Map />
    </div>
  );
}
