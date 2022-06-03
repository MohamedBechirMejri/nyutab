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

  return (
    <div className="w-full p-3 text-2xl font-medium text-center bg-transparent rounded-lg dark:text-white ">
      {currentWeather ? <h1>{currentWeather + "°C"}</h1> : <Loading />}
    </div>
  );
};

export default Weather;
