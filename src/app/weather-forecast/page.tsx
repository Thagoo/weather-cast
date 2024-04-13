import { getWeather } from "@/lib/data";
import CurrentWeather from "@/ui/current-weather";

export default async function WeatherForecast({
  searchParams,
}: {
  searchParams: {
    lat: number;
    lon: number;
  };
}) {
  const weather = await getWeather(searchParams?.lat, searchParams?.lon);

  if (!weather.main) {
    throw new Error(weather.message);
  }
  return (
    <div>
      <CurrentWeather weather={weather} />
    </div>
  );
}
