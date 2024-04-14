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

export function deepSearch(obj: CityData[], searchTerm: string) {
  const searchKey = searchTerm.toLowerCase();
  const data: CityData[] = [];
  function searchNested(currentObj: CityData): CityData[] {
    for (const key in currentObj) {
      if (currentObj.hasOwnProperty(key)) {
        const value = currentObj[key];

        if (typeof value === "object" && value !== null) {
          const result = searchNested(value);
          if (result) {
            return result;
          }
        } else if (String(value).toLowerCase().includes(searchKey)) {
          data.push(currentObj);
          return data;
        }
      }
    }
    return data;
  }

  return searchNested(obj);
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
