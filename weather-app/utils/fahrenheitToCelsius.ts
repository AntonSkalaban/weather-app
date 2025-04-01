export const fahrenheitToCelsius = (fahrenheit: number) => {
  return Math.round(((fahrenheit - 32) * 5) / 9);
};


export const  mphToKmph = (mph: number) =>{
  return   Math.round(mph * 1.60934);
}