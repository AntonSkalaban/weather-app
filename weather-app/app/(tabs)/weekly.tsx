import { View, StyleSheet, Text, FlatList } from "react-native";
import HourlyForecast from "@/components/HourlyForecast/HourlyForecast";
import { fahrenheitToCelsius } from "@/utils/fahrenheitToCelsius";
import { useGetCity, useGetCurrentLocation, useGetWeather } from "@/hooks/api";
import { getWeekdayName } from "@/utils/getWeekDay";


export default function Weekly() {
  const { coords } = useGetCurrentLocation();
  const { isPending: isCityPending, city } = useGetCity(coords);
  const { isPending: isWeatherPending, weather } = useGetWeather(coords);

  return (
    <View style={styles.container}>
      {(isWeatherPending || isCityPending) && <Text>Loading...</Text>}
      {weather && city && (
        <>
          <HourlyForecast hours={weather.days[0].hours} />

          <FlatList
            data={weather.days.slice(1, 8)}
            keyExtractor={(item) => item.datetime}
            renderItem={({ item }) => (
              <View key={item.datetime} style={[styles.card, styles.itemContainer]}>
                <Text style={[styles.text, {width: 100}]}>{getWeekdayName(item)}</Text>
                <Text style={{width: 140}}>{item.icon}</Text>
                <Text style={styles.text}>{fahrenheitToCelsius(item.temp)}°C</Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}

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
  itemContainer: {
    flexDirection: "row",
    marginTop: 10,
    padding: 20,
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "Overpass-Medium",
    color: "#FFF",
  },
  card: {
    boxSizing: "border-box",
    borderRadius: 18,
    backgroundColor: "#ffffff33",
  },
});
