export type CityData = {
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
    lon: string;
    lat: string;
  };
};

export type PaginatedCityData = {
  cityData: CityData[][];
  totalPages: number;
  pageSize: number;
};
