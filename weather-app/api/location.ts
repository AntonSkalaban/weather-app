
import Geolocation from "react-native-geolocation-service";
import { Coordinates } from "@/types";

export const fetchLocation = async () => {
    return new Promise<Coordinates>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          console.log(coords);
          resolve({ mLat: coords.latitude, mLong: coords.longitude });
        },
        (error) => {
          console.log(error.message);
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };