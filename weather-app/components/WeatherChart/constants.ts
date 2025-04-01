import { backgroundColor } from "@/theme/theme";
import { WeatherHour } from "@/types/weather";
import { fahrenheitToCelsius } from "@/utils/fahrenheitToCelsius";
import { ColorSchemeName } from "react-native";


export const chartConfig =(theme: ColorSchemeName) => ({
  backgroundGradientFrom: backgroundColor[theme as 'light' | 'dark'],
  backgroundGradientTo: backgroundColor[theme as 'light' | 'dark'],
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 1,
  barPercentage: 1,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
});

export const getChartData = (dailyHours: WeatherHour[]) => {
  const filteredHours = dailyHours.filter((_, i) => i % 2 === 0);
  return {
    labels: filteredHours.map(({ datetimeEpoch }) => {
      const hours = new Date(datetimeEpoch * 1000).getHours();
      return (hours < 10 ? "0" : "") + hours;
    }),

    datasets: [
      {
        data: filteredHours.map(({ temp }) => fahrenheitToCelsius(temp)),
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };
};
