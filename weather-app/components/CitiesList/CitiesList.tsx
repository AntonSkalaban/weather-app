import { FC } from "react";
import { FlatList, Text } from "react-native";

import { CityItem } from "./CityItem/CityItem";
import { useGetCitiesData } from "@/hooks/useGetCitiesData";

export const CitiesList: FC = () => {
  const { cities, citiesCoords, citiesWeather } = useGetCitiesData();

  if (!citiesCoords.isDone || !citiesWeather.isDone) return <Text>Loading...</Text>;

  return (
    <>
      {cities.length > 0 && (
        <FlatList
          data={cities}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => (
            <CityItem city={item} temperature={citiesWeather.data[index]?.currentConditions.temp} />
          )}
        />
      )}
    </>
  );
};
