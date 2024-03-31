import { useSettingsStore } from "lib/stores";
import { useEffect, useState } from "react";

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState(0);
  // const [forecast, setForecast] = useState(null);
  const [icon, setIcon] = useState("");

  const { settings } = useSettingsStore();
  const coords = settings!.position;

  useEffect(() => {
    if (!coords) return;

    const fetchData = async () => {
      console.log("fetching weather");
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&q=${coords.latitude},${coords.longitude}`
        // `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${coords.latitude},${coords.longitude}&days=7&aqi=no&alerts=no`
      );
      const data = await response.json();
      console.log(data);
      setCurrentWeather(Math.floor(data.current.temp_c));
      setIcon(
        data.current.condition.icon.replace("//cdn.weatherapi.com", "/images")
      );
    };
    fetchData();
  }, [coords]);

  return currentWeather ? (
    <div className="flex items-center justify-center gap-2 font-bold text-center bg-transparent rounded-lg 2xl:text-2xl">
      {currentWeather + "°C"}
      <img src={icon} alt="weather condition" className="w-8" />
    </div>
  ) : (
    <></>
  );
};

export default Weather;
