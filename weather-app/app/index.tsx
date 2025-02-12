import { fetchGeoData } from "@/api/geocoding";
import { fetchLocation } from "@/api/location";
import { fetchWeather } from "@/api/weather";
import { Coordinates } from "@/types";
import { convertFahrenheitToCelsius } from "@/utils/convertFahrenheitToCelsius";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Geolocation from "react-native-geolocation-service";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    margin: "auto",
    backgroundColor: "#4EA3DB",
  },
  degrees__title: {},
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
  red: {
    color: "red",
  },
});

export default function Home() {
  const { data: coords } = useQuery({
    queryKey: ["location"],
    queryFn: fetchLocation,
  });

  const { isPending, data: weather } = useQuery({
    queryKey: ["weather", coords],
    queryFn: () => fetchWeather(coords as Coordinates),
    select: (data) => data,
    enabled: !!coords,
  });

  const { isPending: isCityPending, data: city } = useQuery({
    queryKey: ["city", coords],
    queryFn: () => fetchGeoData(coords as Coordinates),
    select: (data) => {
      console.log(data);
      return data.city;
    },
    enabled: !!coords,
  });

  console.log(isPending);
  // console.log(convertFahrenheitToCelsius(weather?.temperatureInF))

  return (
    <View style={styles.container}>
      {isCityPending ? <Text>City Pending....</Text> : <Text>{city}</Text>}

      {isPending ? (
        <Text>isPending....</Text>
      ) : (
        <Text>{weather && convertFahrenheitToCelsius(weather?.currentConditions.temp)}</Text>
      )}

      {isPending ? (
        <Text>isPending....</Text>
      ) : (
        <View>
          {weather &&
            weather?.days[0].hours.map((h) => {
              return <View key={h.datetime}>
                 <Text>{h.datetime}</Text>
               <Text>{h.temp}</Text>
              </View>;
            })}
        </View>
      )}
    </View>
  );
}
