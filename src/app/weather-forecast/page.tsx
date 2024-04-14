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
  };
}) {
  const { lat, lon } = searchParams;
  const weather = await getWeather(lat, lon);
  const forecast = await getforecast(lat, lon);
  const airPollution = await getAirPollution(lat, lon);

  if (!weather.main) {
    throw new Error(weather.message);
  }
  return (
    <div className="flex flex-col gap-4 px-2 md:px-48">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <CurrentWeather weather={weather} airPollution={airPollution.list[0]} />

        <Forecast forecast={forecast} />
      </div>
      <Map />
    </div>
  );
}
