import { create } from "zustand";
import { State, Actions } from "./types";

import { persist, createJSONStorage } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";


export const useCitiesStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      cities: [],

      addCity: (city) =>
        set((state) => ({
          cities: !state.cities.includes(city) ? [...state.cities, city] : state.cities,
        })),

      removeCity: (city) =>
        set((state) => ({
          cities: state.cities.filter((cityName) => cityName !== city),
        })),
    }),
    {
      name: "city-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
