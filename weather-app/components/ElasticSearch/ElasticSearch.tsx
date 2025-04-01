import { useQuery } from "@tanstack/react-query";

import { fetchGeoSuggest } from "@/api/geoSuggest";
import { useDebounce } from "@/hooks/useDebounce";
import { FC, useEffect, useState } from "react";
import { FlatList, Text, TextInput, View, StyleSheet, TouchableHighlight } from "react-native";
import { useCitiesStore } from "@/store/cities";

export const ElasticSearch: FC= () => {
  const { addCity } = useCitiesStore();

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const { data: suggest, refetch } = useQuery({
    queryKey: ["suggests", value],
    queryFn: () => fetchGeoSuggest(debouncedValue),
    select: (data) => data.results,
  });

  useEffect(() => {
    if (debouncedValue) {
      refetch();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedValue, refetch]);

  const handleClick = (city: string) => async () => {
    setIsOpen(false);
    addCity(city);
  };

  return (
    <View style={styles.input__container}>
      <TextInput
        style={styles.input}
        placeholder="Search city..."
        value={value}
        onChangeText={(value) => setValue(value)}
      />
      {suggest && isOpen && (
        <FlatList
          style={styles.list}
          data={suggest}
          keyExtractor={(item) => item.title.text}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={handleClick(item.title.text)} underlayColor="white">
              <View style={styles.listItem}>
                <Text style={{}}>{item.title.text}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      )}
    </View>
  );
};

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
  input__container: {
    // flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    // marginBottom: 20,
    paddingHorizontal: 10,
  },
  list: {
    padding: 5,
    borderColor: "gray",
    borderWidth: 1,
  },
  listItem: {
    padding: 10,
  },
});
