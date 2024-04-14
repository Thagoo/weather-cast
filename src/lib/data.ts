"use server";

import { groupForecastByDate } from "./utils";

const OPENDATASOFT_API = process.env.OPENDATASOFT_API;
const OPENWEATHER_API = process.env.OPENWEATHER_API;

export const getWeather = async (
  lat: number,
  lon: number,
  units: string = "metric"
) => {
  try {
    let urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API}&units=${units}`;

    const response = await fetch(urlWeather, { next: { revalidate: 600 } });

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getforecast = async (
  lat: number,
  lon: number,
  units: string = "metric"
) => {
  try {
    let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API}&units=${units}`;

    const response = await fetch(urlForecast, { next: { revalidate: 600 } });

    const data = await response.json();

    const filteredData = {
      ...data,
      list: groupForecastByDate(data),
    };

    return filteredData;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
export const getAirPollution = async (
  lat: number,
  lon: number,
  units: string = "metric"
) => {
  try {
    let url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API}&units=${units}`;

    const response = await fetch(url, { next: { revalidate: 600 } });

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
export const getCityList = async () => {
  try {
    const response = await fetch(`${OPENDATASOFT_API}?limit=100`);
    const data = await response.json();

    return data.results;
  } catch (error: any) {
    throw new Error(error);
  }
};
