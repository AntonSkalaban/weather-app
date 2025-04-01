
import { useEffect } from "react";
import { ScrollView, Image, StyleSheet, Text, View } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import CurrentWeather from "@/components/CurrentWeather/CurrentWeather";
import HourlyForecast from "@/components/HourlyForecast/HourlyForecast";
import { WeatherChart } from "@/components/WeatherChart/WeatherChart";
import { useGetCity, useGetCurrentLocation, useGetWeather } from "@/hooks/api";

SplashScreen.preventAutoHideAsync();

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    margin: "auto",
    backgroundColor: "#267ab3",
    fontSize: 20,
    fontFamily: "Overpass-Medium",
    color: "#FFF",
  },
  section: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});


export default function Home() {

  const { coords } = useGetCurrentLocation();
  const { isPending: isCityPending, city } = useGetCity(coords);
  const { isPending: isWeatherPending, weather } = useGetWeather(coords);


  const [loaded, error] = useFonts({
    "Overpass-Medium": require("../../assets/fonts/Overpass-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  console.log(city, weather);
  const icon = require("../../assets/images/weather/cloudy.png");
  return (
    <ScrollView style={styles.container}>
      {(isWeatherPending && isCityPending) || (isCityPending && <Text>Loading...</Text>)}
      {weather && city && (
        <>
          <View style={styles.section}>
            <Image style={{ width: 200, height: 200 }} source={icon} />
            <CurrentWeather city={city} weather={weather.currentConditions} />
          </View>

          <WeatherChart dailyHours={weather.days[0].hours} />
          <HourlyForecast hours={weather.days[0].hours} />
        </>
      )}
    </ScrollView>
  );
}
