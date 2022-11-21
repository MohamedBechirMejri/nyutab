import { useContext, useEffect, useState } from "react";
import Loading from "../Misc/Loading/Loading";
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
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${coords.latitude},${coords.longitude}`
        // `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${coords.latitude},${coords.longitude}&days=7&aqi=no&alerts=no`
      );
      const data = await response.json();
      setCurrentWeather(Math.floor(data.current.temp_c));
      setIcon(
        data.current.condition.icon.replace("//cdn.weatherapi.com", "/images")
      );

      console.log(data);
    };
    coords.latitude && coords.longitude && fetchData();
  }, [coords]);

  return currentWeather ? (
    <div className="flex items-center justify-center gap-2 text-3xl font-medium text-center bg-transparent rounded-lg">
      {currentWeather + "°C"}
      <img src={icon} alt="weather condition" className="w-16" />
    </div>
  ) : (
    <Loading />
  );
};

export default Weather;
