import { GeoSuggestResponse } from "@/types/geoSuggest";

const GEOSUGGEST_API_URL = "https://suggest-maps.yandex.ru/v1/suggest";
const GEOSUGGEST_API_KEY = "55732155-fc43-4289-b083-5816c8f2fc9a";

export const fetchGeoSuggest = async (text: string) => {
  try {
    const response = await fetch(`${GEOSUGGEST_API_URL}?apikey=${GEOSUGGEST_API_KEY}&text=${text}&types=locality`);

    if (!response.ok) throw Error(`HTTP error! status: ${response.status}`);
    const data: GeoSuggestResponse = await response.json();

    return data;
  } catch (e) {
    console.error("Error fetching weather data:", (e as Error).message);
    throw Error("Error fetching weather data:", e as Error);
  }
};
