// import { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { CitiesList } from "@/components/CitiesList/CitiesList";
import { ElasticSearch } from "@/components/ElasticSearch/ElasticSearch";
import { useCitiesStore } from "@/store/cities";

export default function City() {

  return (
    <View style={styles.container}>
      <ElasticSearch />
      <CitiesList />
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
  input__container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
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
