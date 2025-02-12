export const convertFahrenheitToCelsius = (fahrenheit: number) => {
  return Math.round(((fahrenheit - 32) * 5) / 9);
};
