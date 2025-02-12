import { Coordinates } from "@/types";

const WEATHER_API_URL = "https://weather.visualcrossing.com";
const WEATHER_API_KEY = "SH567R7NDXLS8ZNGZJWSMFJXN";

export const fetchWeather = async ({ mLat, mLong }: Coordinates) => {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}/VisualCrossingWebServices/rest/services/timeline/${mLat},${mLong}?key=${WEATHER_API_KEY}`
    );

    if (!response.ok) throw Error(`HTTP error! status: ${response.status}`);
    const data: WeatherData = await response.json();
    return data;
  } catch (e) {
    console.error("Error fetching weather data:", (e as Error).message);
    throw Error("Error fetching weather data:", (e as Error));
  }
};
