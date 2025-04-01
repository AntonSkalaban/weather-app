import { Coordinates } from "@/types/index";
import { WeatherData } from "@/types/weather";

const WEATHER_API_URL = "https://weather.visualcrossing.com";
const WEATHER_API_KEY = "SH567R7NDXLS8ZNGZJWSMFJXN";

export const fetchWeather = async ({ latitude, longitude }: Coordinates): Promise<WeatherData> => {
  const response = await fetch(
    `${WEATHER_API_URL}/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=${WEATHER_API_KEY}`
  );

  if (!response.ok) throw Error(`HTTP weather error! status: ${response.status}`);
  return await response.json();
};
