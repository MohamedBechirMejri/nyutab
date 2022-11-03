import { useEffect, useState } from "react";
import Loading from "../Misc/Loading/Loading";

const Weather = () => {
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [currentWeather, setCurrentWeather] = useState(0);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${coords.latitude},${coords.longitude}`
      );
      const data = await response.json();
      setCurrentWeather(Math.floor(data.current.temp_c));
      setIcon(
        data.current.condition.icon.replace("//cdn.weatherapi.com", "/images")
      );
    };
    fetchData();
  }, [coords.latitude, coords.longitude]);

  return currentWeather ? (
    <div className="font-medium text-center bg-transparent rounded-lg dark:text-white text-lg flex items-center justify-center gap-2">
      {currentWeather + "°C"}
      <img src={icon} alt="weather condition" className="w-8" />
    </div>
  ) : (
    <Loading />
  );
};

export default Weather;
