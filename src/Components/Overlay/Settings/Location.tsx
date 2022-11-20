import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getLocation } from "../../../lib/locationUtils";

const Location = ({
  position,
  setPosition,
}: {
  position: {
    city: string;
    country: string;
    latitude: any;
    longitude: any;
  };
  setPosition: any;
}) => {
  const [location, setLocation] = useState({
    country: position ? position.country : "Tunisia",
    city: position ? position.city : "Tunis",
  });
  const [coordinates, setCoordinates] = useState({
    latitude: position ? position.latitude : 36.8,
    longitude: position ? position.longitude : 10.18,
  });

  useEffect(() => {});

  useEffect(() => {
    (async () => {
      setLocation(
        await getLocation(coordinates.latitude, coordinates.longitude)
      );
    })();
  }, [coordinates]);

  useEffect(() => {
    if (!location.country || !location.city) return;
    setPosition({ ...location, ...coordinates });
  }, [location]);

  return (
    <motion.div
      className="flex items-center justify-center flex-col text-5xl font-[GreatVibes] tracking-wide font-light gap-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="">Set you location</h1>
      <div className="font-serif text-3xl text-center flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2">
          City:{" "}
          <input
            type="text"
            onChange={e =>
              setLocation(location => ({
                ...location,
                city: e.target.value,
              }))
            }
            value={location.city}
            className="bg-transparent border-none text-2xl rounded-lg transition-all focus:ring-current text-center"
          />
        </div>
        <div className="flex flex-col gap-2">
          Country:{" "}
          <input
            type="text"
            onChange={e =>
              setLocation(location => ({
                ...location,
                country: e.target.value,
              }))
            }
            value={location.country}
            className="bg-transparent border-none text-2xl rounded-lg transition-all focus:ring-current text-center"
          />{" "}
        </div>
      </div>
      <button
        onClick={() => {
          navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setCoordinates({ latitude, longitude });
          });
        }}
      >
        Get Location
      </button>
    </motion.div>
  );
};

export default Location;
