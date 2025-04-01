import { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { CurrentConditions } from "@/types/weather";
import { fahrenheitToCelsius, mphToKmph } from "@/utils/fahrenheitToCelsius";

const styles = StyleSheet.create({
  text: {
    fontFamily: "Overpass-Medium",
    color: "#FFF",
  },
  card: {
    width: "80%",
    maxWidth: 400,
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
  card__info: {
    fontFamily: "Overpass-Medium",
    color: "#FFF",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
});
const CurrentWeather: FC<{ city: string; weather: CurrentConditions }> = ({ city, weather }) => {
  return (
    <View style={styles.card}>
      <Text style={[styles.text, { fontSize: 26 }]}>{city}</Text>

      <Text style={[styles.text, { fontSize: 62 }]}>{fahrenheitToCelsius(weather.temp)}°</Text>

      <Text style={styles.text}>{weather.conditions}</Text>

      <View style={styles.card__info}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: 60 }}>
          <Image style={{ width: 20, height: 20 }} source={require("./windy.png")} />

          <Text style={[styles.text, { marginLeft: 8 }]}>wind</Text>
        </View>

        <Text style={styles.text}>|</Text>

        <Text style={[styles.text, { width: 60 }]}>{mphToKmph(weather.windspeed)} km/h</Text>
      </View>

      <View style={styles.card__info}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: 60 }}>
          <Image style={{ width: 20, height: 20 }} source={require("./hum.png")} />
          <Text style={[styles.text, { marginLeft: 8 }]}>hum</Text>
        </View>

        <Text style={styles.text}>|</Text>
        <Text style={[styles.text, { width: 60 }]}>{weather.humidity.toFixed(1)} %</Text>
      </View>
    </View>
  );
};

export default CurrentWeather;
