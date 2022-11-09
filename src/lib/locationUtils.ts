import axios from "axios";

export const getGeoCoords = () => {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};

export const getLocation = async () => {
  const position: any = await getGeoCoords();
  const { latitude, longitude } = position.coords;

  const res = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${latitude},${longitude}`
  );
  console.log("res: ", res);
  // TODO: look for a better location api
  return { city: res.data.location.name, country: res.data.location.country };
};
