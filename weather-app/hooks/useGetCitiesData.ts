import { fetchGeoData } from "@/api/geoData";
import { fetchWeather } from "@/api/weather";
import { useCitiesStore } from "@/store/cities";
import { GeocodeResponse } from "@/types/geocoding";
import { WeatherData } from "@/types/weather";
import { useQueries, UseQueryResult } from "@tanstack/react-query";

export const useGetCitiesData = () => {
  const { cities } = useCitiesStore();

  const citiesCoords = useQueries({
    queries: cities.map((city) => ({
      queryKey: ["cityCoords", city],
      queryFn: () => fetchGeoData(city),
    })),
    combine: (results: UseQueryResult<GeocodeResponse, Error>[]) => {
      return {
        data: results.map((res) => {
          if (!res.data) return;

          const [longitude, latitude] =
            res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
              .split(" ")
              .map(Number);

          return { latitude, longitude };
        }),
        isPending: results.some((res) => res.isPending),
        isError: results.some((res) => res.isError),
        isDone: results.every((res) => res.data),
      };
    },
  });

  const citiesWeather = useQueries({
    queries: citiesCoords.data.map((data, indx) => ({
      queryKey: ["cityWeather", cities[indx]],
      queryFn: () => fetchWeather(data!),
      enabled: citiesCoords.isDone,
    })),

    combine: (results: UseQueryResult<WeatherData, Error>[]) => {
      
      return {
        data: results.map((res) => res.data),
        isPending: results.some((res) => res.isPending),
        isError: results.some((res) => res.isError),
        isDone: results.every((res) => res.data),
      };
    },
  });

  return {
    cities,
    citiesCoords,
    citiesWeather,
  };
};
