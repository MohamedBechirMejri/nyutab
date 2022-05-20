import React, { useState } from "react";

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState(0);

  return (
    <div className="w-full p-3 text-2xl font-medium text-center bg-transparent rounded-lg dark:text-white ">
      <h1>{currentWeather + "°C"}</h1>
    </div>
  );
};

export default Weather;
