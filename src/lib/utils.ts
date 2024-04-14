import { CityData, Forecast, PaginatedCityData } from "./definitions";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const generatePagination = (cityData: CityData[]) => {
  if (cityData.length < 1) {
    throw new Error("No city data");
  }
  const pageSize = 20;
  const totalPages = Math.ceil(cityData.length / pageSize);
  let pages = cityData,
    chunk = [];

  while (pages.length > 0) {
    chunk.push(cityData.splice(0, pageSize));
  }
  const paginatedCityData: PaginatedCityData = {
    cityData: chunk,
    pageSize: pageSize,
    totalPages: totalPages,
  };
  return paginatedCityData;
};

export const sortByNameAsc = (cities: CityData[]) => {
  return cities.sort((a, b) => a.name.localeCompare(b.name));
};

export const sortByNameDes = (cities: CityData[]) => {
  return cities.sort((a, b) => b.name.localeCompare(a.name));
};
export const sortByPopulation = (cities: CityData[]) => {
  return cities.sort((a, b) => a.population - b.population);
};

export const sortByCountry = (cities: CityData[]) => {
  return cities.sort((a, b) => a.cou_name_en.localeCompare(b.cou_name_en));
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function deepSearch(data: CityData[], searchTerm: string) {
  const lowercaseTerm = searchTerm.toLowerCase();
  const result = [];

  for (const obj of data) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (
          value !== null &&
          value.toString().toLowerCase().includes(lowercaseTerm)
        ) {
          result.push(obj);
          break;
        }
      }
    }
  }
  return result;
}

export function convertToDate(
  timezone: number,
  dt: number,
  weekdayFormat: "short" | "long"
): string {
  let utc_time = new Date(dt * 1000);
  let local_time = new Date(utc_time.getTime() + timezone * 1000);

  const options = { weekday: weekdayFormat };
  const dateFormatter = new Intl.DateTimeFormat("UTC", options);

  return dateFormatter.format(local_time);
}

export function convertToTime(timezone: number, dt: number): string | null {
  if (!timezone || !dt) {
    return null;
  }
  let utc_time = new Date(dt * 1000);
  let local_time = new Date(utc_time.getTime() + timezone * 1000);
  const timeString = utc_time.toLocaleTimeString();

  return timeString;
}

export function groupForecastByDate(data: Forecast) {
  const uniqueDates = {};
  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0]; // Extracting date from dt_txt
    if (!uniqueDates[date]) {
      uniqueDates[date] = item;
    }
  });
  return Object.values(uniqueDates);
}
