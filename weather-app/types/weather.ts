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

export interface CurrentConditions extends BaseWeather {
  moonphase: number;
  stations: any[];
  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;
}

export interface WeatherHour extends BaseWeather {
  stations: string[];
}

export interface WeatherDay extends BaseWeather {
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

export interface WeatherData {
  address: string;
  alerts: any[];
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
