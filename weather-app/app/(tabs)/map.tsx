import { useGetCitiesData } from "@/hooks/useGetCitiesData";
import { StyleSheet, Text, View } from "react-native";

import MapView, { Marker } from "react-native-maps";

export default function Map() {
  const { cities, citiesCoords, citiesWeather } = useGetCitiesData();

  if (!citiesCoords.isDone || !citiesWeather.isDone) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
       
      >
        {cities.map((city, indx) => {
          return (
            <Marker
              key={city}
              coordinate={citiesCoords.data[indx]!}
              title={city}
            >
              <View style={{ width: 40, height: 40, backgroundColor: "blue", padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text>{String(citiesWeather.data[indx]!.currentConditions.temp)}</Text>
              </View>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
//   return (
