interface BaseWeather {
  cloudcover: number;
  conditions: string;
  datetime: string;
  datetimeEpoch: number;
  dew: number;
  feelslike: number;
  humidity: number;
  icon: string;
  precip: number;
  precipprob: number;
  preciptype: string | null;
  pressure: number;
  severerisk: number;
  snow: number;
  snowdepth: number;
  solarenergy: number;
  solarradiation: number;
  source: string;
  temp: number;
  uvindex: number;
  visibility: number;
  winddir: number;
  windgust: number;
  windspeed: number;
}

interface CurrentConditions extends BaseWeather {
  moonphase: number;
  stations: any[]; // Assuming it's an array of station objects, replace any with a more specific type if available
  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;
}

interface WeatherHour extends BaseWeather {
  stations: string[];
}

interface WeatherDay extends BaseWeather {
  description: string;
  feelslikemax: number;
  feelslikemin: number;
  hours: WeatherHour[];
  moonphase: number;
  precipcover: number;
  stations: string[];
  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;
  tempmax: number;
  tempmin: number;
}

interface WeatherData {
  address: string;
  alerts: any[]; // Assuming it's an array of alert objects, replace any with a more specific type if available
  currentConditions: CurrentConditions;
  days: WeatherDay[];
  description: string;
  latitude: number;
  longitude: number;
  queryCost: number;
  resolvedAddress: string;
  timezone: string;
  tzoffset: number;
}