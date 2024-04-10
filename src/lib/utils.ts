import { CityData, PaginatedCityData } from "./definitions";

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
