export type Actions = {
  addCity: (city: string) => void;
  removeCity: (city: string) => void;
};

export type State = {
  cities: string[];
};
