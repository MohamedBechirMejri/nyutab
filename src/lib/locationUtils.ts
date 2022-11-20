import axios from "axios";

export const getLocation = async (latitude: any, longitude: any) => {
  const res = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${latitude},${longitude}`
  );
  // TODO: look for a better location api
  return { city: res.data.location.name, country: res.data.location.country };
};

export const getCoords = async (city: string) => {
  const res = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city}`
  );

  return {
    latitude: res.data.location.lat,
    longitude: res.data.location.lon,
  };
};
