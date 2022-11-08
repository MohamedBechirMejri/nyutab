import axios from "axios";
import getGeoCoords from "./getGeoCoords";

const getCity = async () => {
  const position: any = await getGeoCoords();
  const { latitude, longitude } = position.coords;

  const res = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.REACT_APP_OPENCAGEDATA_APIKEY}`
  );
  return res.data.results[0].components.city;
};

export default getCity;
