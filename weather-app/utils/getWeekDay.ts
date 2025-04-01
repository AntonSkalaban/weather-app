import { WeatherDay } from "@/types/weather";

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const getWeekdayName = (day: WeatherDay) => {
  return weekday[new Date(day.datetime).getDay()];
};