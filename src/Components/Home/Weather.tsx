import React, { useEffect, useState } from "react";
import Loading from "../Misc/Loading/Loading";

const Weather = () => {
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [currentWeather, setCurrentWeather] = useState(0);

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
      setCurrentWeather(data.current.temp_c);
    };
    fetchData();
  }, [coords.latitude, coords.longitude]);

  return currentWeather ? (
    <h1 className="font-medium text-center bg-transparent rounded-lg dark:text-white text-lg">
      {currentWeather + "°C"}
    </h1>
  ) : (
    <Loading />
  );
};

export default Weather;
