import { FC } from "react";
import { LineChart } from "react-native-chart-kit";
import { chartConfig, getChartData } from "./constants";
import { WeatherHour } from "@/types/weather";
import { Dimensions, useColorScheme } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const WeatherChart: FC<{ dailyHours: WeatherHour[] }> = ({ dailyHours }) => {
  const theme = useColorScheme();

  return (
    <LineChart
      data={getChartData(dailyHours)}
      width={screenWidth}
      height={256}
      verticalLabelRotation={0}
      chartConfig={chartConfig(theme)}
      yAxisSuffix="°"
      bezier
    />
  );
};
