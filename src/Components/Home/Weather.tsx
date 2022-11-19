import { useContext, useEffect, useState } from "react";
import Loading from "../Misc/Loading/Loading";
import { SettingsContext } from "../../lib/contexts";

const Weather = () => {
  const settings = useContext(SettingsContext);

  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [currentWeather, setCurrentWeather] = useState(0);
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
    <div className="flex items-center justify-center gap-2 text-lg font-medium text-center bg-transparent rounded-lg">
      {currentWeather + "°C"}
      <img src={icon} alt="weather condition" className="w-8" />
    </div>
  ) : (
    <Loading />
  );
};

export default Weather;
