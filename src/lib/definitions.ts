export type CityData = {
  [key: string]: any;
  geoname_id: string;
  name: string;
  ascii_name: string;
  alternate_names: string[];
  feature_class: string;
  feature_code: string;
  country_code: string;
  cou_name_en: string;
  country_code_2: null | string;
  admin1_code: string;
  admin2_code: string;
  admin3_code: null;
  admin4_code: null;
  population: number;
  elevation: string;
  dem: number;
  timezone: string;
  modification_date: string;
  label_en: string;
  coordinates: {
    lon: number;
    lat: number;
  };
};

export type PaginatedCityData = {
  cityData: CityData[][];
  totalPages: number;
  pageSize: number;
};

export type Weather = {
  coord: {
    lon: number | null;
    lat: number | null;
  };
  weather: [
    {
      id: number | null;
      main: string | null;
      description: string | null;
      icon: string | null;
    }
  ];
  base: string | null;
  main: {
    temp: number | null;
    feels_like: number | null;
    temp_min: number | null;
    temp_max: number | null;
    pressure: number | null;
    humidity: number | null;
    sea_level: number | null;
    grnd_level: number | null;
  };
  visibility: number | null;
  wind: {
    speed: number | null;
    deg: number | null;
    gust: number | null;
  };
  clouds: {
    all: number | null;
  };
  dt: number | null;
  sys: {
    type: number | null;
    id: number | null;
    country: string | null;
    sunrise: number | null;
    sunset: number | null;
  };
  timezone: number | null;
  id: number | null;
  name: string | null;
  cod: number | null;
};

export type ForecastType = {
  list: [
    {
      dt: number;
      dt_txt: string;
      main: {
        temp_min: number;
        temp_max: number;
      };
      weather: [
        {
          icon: string;
          description: string;
        }
      ];
    }
  ];
  city: {
    timezone: number;
  };
};
export type AirPollutionType = {
  dt: number;
  main: {
    aqi: 1 | 2 | 3 | 4 | 5;
  };
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
};

export type PlacesSuggestion = {
  city: string;
  region: string | null;
  country: string;
  latitude: number;
  longitude: number;
};
