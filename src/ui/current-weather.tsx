import React from "react";
import { AirPollutionType, Weather } from "@/lib/definitions";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import Image from "next/image";
import { EyeDropperIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { convertToTime } from "@/lib/utils";
import Divider from "./divider";
import AirPollution from "./air_pollution";
import { MoveDown } from "lucide-react";
import UnitsMenu from "./units-menu";

export default function CurrentWeather({
  weather,
  units,
  airPollution,
}: {
  weather: Weather;
  units: string;
  airPollution: AirPollutionType;
}) {
  const unitsSystem = {
    temp: units === "metric" ? "C" : "F",
    windSpeed: units === "metric" ? "KM/H" : "M/H",
    pressure:
      units === "metric" ? "hPa" : units === "imperial" ? "psi" : "inHg",
    visibility: units === "metric" ? "KM" : "M",
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <MapPinIcon className="w-6" />
          <span className="text-2xl">{weather.name}</span>
          <span className="ml-auto ">
            {convertToTime(weather.timezone as number, weather.dt as number)}
          </span>
          <UnitsMenu />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row w-full justify-between gap-2 space-y-8 md:space-y-0">
          <div className="flex flex-col justify-between gap-6 md:gap-1">
            <div className="flex items-start gap-4 justify-center md:justify-start">
              <Image
                src={`/assets/icons/${weather.weather[0].icon}.svg`}
                alt="icon"
                width={110}
                height={110}
                quality={100}
                className=" invert-0 dark:invert"
              />

              <div className="flex flex-col">
                <h1 className="font-normal text-7xl relative">
                  {Math.floor(weather.main.temp as number)}&#176;
                  <span className="text-4xl opacity-50 font-light">
                    {unitsSystem.temp}
                  </span>
                </h1>

                <p className="font-extralight text-sm opacity-80">
                  H: {Math.floor(weather.main.temp_max as number)}&#176; L:{" "}
                  {Math.floor(weather.main.temp_min as number)}
                  &#176;
                </p>
              </div>
            </div>
            <h1 className="text-3xl text-center md:text-start capitalize text-card-foreground">
              {weather.weather[0].description}
            </h1>
            <AirPollution airPollution={airPollution} />
          </div>
          <div className="w-full md:w-1/2 flex flex-col">
            <SideLeaves
              title="Feels Like"
              desc={` ${weather.main.feels_like}°`}
            />
            <Divider />
            <SideLeaves
              title="Wind"
              desc={`ESE ${weather.wind.speed} ${unitsSystem.windSpeed}`}
            />
            <Divider />
            <SideLeaves title="Humidity" desc={`${weather.main.humidity}°`} />
            <Divider />
            <SideLeaves
              title="Pressure"
              desc={`${weather.main.pressure} ${unitsSystem.pressure}`}
            />
            <Divider />
            <SideLeaves
              title="Visibility"
              desc={`${(weather.visibility as number) / 1000} ${
                unitsSystem.visibility
              }`}
            />
            <Divider />
            <SideLeaves
              title="Sunrise"
              desc={convertToTime(
                weather.timezone as number,
                weather.sys.sunrise as number
              )}
            />
            <Divider />
            <SideLeaves
              title="Sunset"
              desc={convertToTime(
                weather.timezone as number,
                weather.sys.sunset as number
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SideLeaves({
  title,
  desc,
}: {
  title: string;
  desc: string | number | null;
}) {
  return (
    <div className="pl-4 flex flex-nowrap text-nowrap">
      <span className="flex-grow text-lg text-accent-foreground opacity-60">
        {title}
      </span>
      <span className="">{desc || "N/A"}</span>
    </div>
  );
}
