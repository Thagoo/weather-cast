const OPENDATASOFT_API = process.env.OPENDATASOFT_API;
const OPENWEATHER_API = process.env.OPENWEATHER_API;

export const getWeather = async (lat, lon, units) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API}&units=${units}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCityList = async () => {
  try {
    const response = await fetch(`${OPENDATASOFT_API}?limit=100`);
    const data = await response.json();

    return data.results;
  } catch (error) {
    throw new Error(error);
  }
};

export const cityDataHeaders = [
  "No.",
  "Geoname ID",
  "Name",
  "Country name EN",
  "ASCII Name",
  "Alternate Names",
  "Population",
  "DIgital Elevation Model",
  "Timezone",
  "Country Code",
  "Coordinates",
];
