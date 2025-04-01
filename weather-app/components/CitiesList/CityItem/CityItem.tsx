import { FC, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Animated,
  TouchableOpacity,
  PanResponder,
} from "react-native";
import { fahrenheitToCelsius } from "@/utils/fahrenheitToCelsius";
import { useCitiesStore } from "@/store/cities";

export const CityItem: FC<{
  city: string;
  temperature: number | undefined;
}> = ({ city, temperature }) => {
  const { removeCity } = useCitiesStore();

  const translateX = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          Animated.spring(translateX, {
            toValue: -100,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!temperature) return null;

  const handleDelete = () => {
    removeCity(city);
  };

  return (
    <View style={[styles.card, styles.itemContainer]}>
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateX: translateX }],
        }}
      >
        <View style={styles.item} {...panResponder.panHandlers}>
          <Text style={styles.text}>{city}</Text>
          <Text style={styles.text}>{fahrenheitToCelsius(temperature)}°C</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    marginTop: 10
  },
  text: {
    fontFamily: "Overpass-Medium",
    color: "#FFF",
  },
  item: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: "#ccc",
  },

  deleteButton: {
    width: 100,
    height: "100%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: -100,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  card: {
    boxSizing: "border-box",
    borderRadius: 18,
    backgroundColor: "#ffffff33",
    overflow: "hidden",
  },
});
