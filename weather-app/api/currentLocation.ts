import { Coordinates } from "@/types";
import * as Location from "expo-location";

export const getCurrentCoordinates = async (): Promise<Coordinates> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw Error("Permission to access location was denied");
  }

  const {
    coords: { latitude, longitude },
  } = await Location.getCurrentPositionAsync();

  return { latitude, longitude };
};
