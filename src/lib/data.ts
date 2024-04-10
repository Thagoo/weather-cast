const OPENDATASOFT_API = process.env.OPENDATASOFT_API;
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
