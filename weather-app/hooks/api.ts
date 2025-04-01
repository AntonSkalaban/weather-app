import { getCurrentCoordinates } from "@/api/currentLocation";
import { fetchGeoData } from "@/api/geoData";
import { fetchWeather } from "@/api/weather";
import { Coordinates } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentLocation = () => {
  const { isPending, data } = useQuery({
    queryKey: ["location"],
    queryFn: getCurrentCoordinates,
  });

  return { isPending, coords: data };
};

export const useGetCity = (coords: Coordinates | undefined) => {
  const { isPending, data } = useQuery({
    queryKey: ["currentCity", `${coords?.longitude},${coords?.latitude}`],
    queryFn: () => fetchGeoData(`${coords?.longitude},${coords?.latitude}`),
    select: (data) =>
      data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData?.Address.Components.find(
        ({ kind }) => kind === "locality"
      )?.name,
    enabled: !!(coords?.latitude && coords?.longitude),
  });

  return { isPending, city: data };
};

export const useGetWeather = (coords: Coordinates | undefined) => {
  const { isPending, data: weather } = useQuery({
    queryKey: ["weather", `${coords?.longitude},${coords?.latitude}`],
    queryFn: () => fetchWeather(coords!),
    select: (data) => data,
    enabled: !!(coords?.latitude && coords?.longitude),
  });

  return { isPending, weather };
};
