"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMemo } from "react";
import ReactMapGL, { Layer, LayerProps, Source } from "react-map-gl";
import { Card } from "../ui/card";

import { useSearchParams } from "next/navigation";

import { useTheme } from "next-themes";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_ID;

const OPENWEATHERMAP_TOKEN = process.env.NEXT_PUBLIC_OPENWEATHER_MAP_TOKEN;

export default function Map() {
  const { theme } = useTheme();
  const MapTheme = useMemo(() => {
    return theme === "system"
      ? window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  }, [theme]);

  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  const viewport = {
    latitude: Number(lat),
    longitude: Number(lon),
    zoom: 7,
    pitch: 60,
    bearing: -60,
  };

  const weatherLayer: LayerProps = {
    id: "weatherLayer",
    type: "raster",
    minzoom: 0,
    maxzoom: 15,
  };

  return (
    <Card className="order-11 col-span-2 h-[25rem] overflow-hidden overscroll-contain  p-0 md:p-0 xl:col-span-3">
      <ReactMapGL
        reuseMaps
        {...viewport}
        attributionControl={false}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle={`mapbox://styles/mapbox/${MapTheme}-v11`}
        style={{
          flex: "1",
          position: "relative",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          zIndex: 0,
        }}
      >
        <Source
          key="TA2"
          id="weatherSource"
          type="raster"
          tiles={[
            `https://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid=${OPENWEATHERMAP_TOKEN}`,
          ]}
          tileSize={256}
        >
          <Layer {...weatherLayer} />
        </Source>

        <div className="absolute left-2 top-2  px-6 py-1 rounded-md">
          <h1 className="text-accent-foreground font-semibold text-shadow-lg">
            Temperature
          </h1>
        </div>
      </ReactMapGL>
    </Card>
  );
}
