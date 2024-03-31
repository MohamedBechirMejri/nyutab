import { useContext, useEffect, useState } from "react";
import Loading from "../../../components/loading";
import { SettingsContext } from "../../lib/contexts";

const Weather = () => {
  const settings = useContext(SettingsContext);

  const [coords, setCoords] = useState({
    latitude: settings?.position.latitude,
    longitude: settings?.position.longitude,
  });
  const [currentWeather, setCurrentWeather] = useState(0);
  // const [forecast, setForecast] = useState(null);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    if (!settings) return;
    const { latitude, longitude } = settings.position;
    setCoords({
      latitude,
      longitude,
    });
  }, [settings]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&q=${coords.latitude},${coords.longitude}`
        // `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${coords.latitude},${coords.longitude}&days=7&aqi=no&alerts=no`
      );
      const data = await response.json();
      setCurrentWeather(Math.floor(data.current.temp_c));
      setIcon(
        data.current.condition.icon.replace("//cdn.weatherapi.com", "/images")
      );
    };
    coords.latitude && coords.longitude && fetchData();
  }, [coords]);

  return currentWeather ? (
    <div className="flex items-center justify-center gap-2 font-bold text-center bg-transparent rounded-lg 2xl:text-2xl">
      {currentWeather + "°C"}
      <img src={icon} alt="weather condition" className="w-8" />
    </div>
  ) : (
    <Loading />
  );
};

export default Weather;
