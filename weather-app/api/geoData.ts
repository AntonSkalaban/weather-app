import { GeocodeResponse } from "@/types/geocoding";

const GEOCODING_API_URL = "https://geocode-maps.yandex.ru/v1";
const GEOCODING_API_KEY = "06e02f1b-dd33-4c68-9155-82fc6be76409";

export const fetchGeoData = async (location: string): Promise<GeocodeResponse> => {
  const response = await fetch(
    `${GEOCODING_API_URL}?&apikey=${GEOCODING_API_KEY}&geocode=${location}&format=json`
  );
  if (!response.ok) throw Error(`HTTP geocode error! status: ${response.status}`);
  return await response.json();
};
