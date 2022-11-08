import axios from "axios";
import getGeoCoords from "./getGeoCoords";

const getCity = async () => {
  const position: any = await getGeoCoords();
  const { latitude, longitude } = position.coords;

  const res = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${latitude},${longitude}`
  );

  // TODO: look for a better location api
  return res.data.location.country;
};

export default getCity;
