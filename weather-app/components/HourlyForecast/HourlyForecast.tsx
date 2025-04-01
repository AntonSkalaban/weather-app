import { FC } from "react";
import { WeatherHour } from "@/types/weather";

import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import { fahrenheitToCelsius } from "@/utils/fahrenheitToCelsius";

const styles = StyleSheet.create({
  card: {
    position: "relative",
    padding: 8,
    boxSizing: "border-box",
    borderRadius: 18,
    backgroundColor: "#ffffff33",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
    justifyContent: "space-between",
  },
 
});

const HourlyForecast: FC<{ hours: WeatherHour[] }> = ({ hours }) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={{ display: "flex", flexDirection: "row", gap: 10, height: 90 }}>
        {hours.map((h) => {
          return (
            <View key={h.datetime} style={styles.card}>
              <Text>{h.datetime.slice(0, -3)}</Text>
              <Image style={{ width: 20, height: 20 }} source={require("./cloudy.png")} />
              <Text>{fahrenheitToCelsius(h.temp)}&deg;C</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default HourlyForecast;
