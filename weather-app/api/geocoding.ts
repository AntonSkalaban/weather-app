import { Coordinates } from "@/types";
import { GeoData } from "@/types/geocoding";

const GEOCODING_API_URL = "https://api-bdc.net/data/reverse-geocode";
const GEOCODING_API_KEY = "bdc_4f03491a9c974df0bce11d04443f0bb9";


export const fetchGeoData = async ({ mLat, mLong }: Coordinates) => {
  try {
    const response = await fetch(
      `${GEOCODING_API_URL}?latitude=${mLat}&longitude=${mLong}&localityLanguage=en&key=${GEOCODING_API_KEY}`)
    if (!response.ok) throw Error(`HTTP error! status: ${response.status}`);
    const data: GeoData = await response.json();
    console.log('geo data', data)
    return data;
  } catch (e) {
    console.error("Error fetching weather data:", (e as Error).message);
    throw Error("Error fetching weather data:", (e as Error));
  }
};
