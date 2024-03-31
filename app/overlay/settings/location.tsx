import { motion } from "framer-motion";
import { getCoords, getLocation } from "lib/locationUtils";
import { useEffect, useState } from "react";

const Location = () => {
  const [location, setLocation] = useState({
    country: position ? position.country : "Tunisia",
    city: position ? position.city : "Tunis",
  });
  const [coordinates, setCoordinates] = useState({
    latitude: position ? position.latitude : 36.8,
    longitude: position ? position.longitude : 10.18,
  });

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
      className="flex flex-col items-center justify-center text-5xl font-light tracking-wide gap-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="">Set you location</h1>
      <div className="flex flex-col items-center gap-4 font-serif text-3xl text-center">
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
            onBlur={async e => {
              // @ts-ignore
              const city = e.target.value;
              city && setCoordinates(await getCoords(city));
            }}
            value={location.city}
            className="text-2xl text-center transition-all bg-transparent border-none rounded-lg focus:ring-current"
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
            className="text-2xl text-center transition-all bg-transparent border-none rounded-lg focus:ring-current"
          />{" "}
        </div>
      </div>{" "}
      <div className="flex flex-col items-center gap-4 font-serif text-3xl text-center lg:flex-row">
        <div className="flex gap-2">
          lat:{" "}
          <input
            type="number"
            onChange={e =>
              setCoordinates(coords => ({
                ...coords,
                latitude: e.target.value,
              }))
            }
            value={coordinates.latitude}
            className="text-2xl text-center transition-all bg-transparent border-none rounded-lg focus:ring-current"
          />
        </div>
        <div className="flex gap-2">
          lon:{" "}
          <input
            type="number"
            onChange={e =>
              setCoordinates(coords => ({
                ...coords,
                longitude: e.target.value,
              }))
            }
            value={coordinates.longitude}
            className="text-2xl text-center transition-all bg-transparent border-none rounded-lg focus:ring-current"
          />
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
