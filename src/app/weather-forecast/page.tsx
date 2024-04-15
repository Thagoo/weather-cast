import { getAirPollution, getWeather, getforecast } from "@/lib/data";
import CurrentWeather from "@/ui/current-weather";
import Forecast from "@/ui/fiveday-forecast";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/ui/map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

interface SearchParams {
  lat: number;
  lon: number;
  units: "metric" | "imperial" | "standard";
}

// Generate metadata dynamically
export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { lat, lon, units } = searchParams;
  let unitSystem =
    units === "standard" || units === "imperial" || units === "metric"
      ? units
      : "metric";
  const weather = await getWeather(lat, lon, unitSystem);
  if (!weather.name) {
    return {
      title: `Not found`,
      description: `Something went wrong while fetching details`,
    };
  }
  return {
    title: `${weather.name} ${weather.main.temp}°C`,
    description: `${weather.name} taday's weather condition and five day weather details `,
  };
}

export default async function WeatherForecast({
  searchParams,
}: {
  searchParams: SearchParams;
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
