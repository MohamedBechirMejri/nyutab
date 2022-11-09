import { motion } from "framer-motion";
import { useState } from "react";

const Location = ({ setPosition }: { setPosition: any }) => {
  const [location, setLocation] = useState({
    country: "",
    city: "",
    latitude: 0,
    longitude: 0,
  });

  // TODO: add ability to add info manually

  return (
    <motion.div
      className="flex items-center justify-center flex-col text-5xl font-[GreatVibes] tracking-wide font-light gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>
        lat: {location.latitude} lon: {location.longitude}
      </h1>
      <button
        onClick={() => {
          navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setPosition({ latitude, longitude });
            setLocation(location => ({ ...location, latitude, longitude }));
          });
        }}
      >
        Get Location
      </button>
    </motion.div>
  );
};

export default Location;
