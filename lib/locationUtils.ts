export const getLocation = async (latitude: any, longitude: any) => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&q=${latitude},${longitude}`
  ).then(res => res.json());
  // TODO: look for a better location api
  return { city: res.location.name, country: res.location.country };
};

export const getCoords = async (city: string) => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&q=${city}`
  ).then(res => res.json());

  return {
    latitude: res.location.lat,
    longitude: res.location.lon,
  };
};

export const getUserLocation = async () => {
  if (!("geolocation" in navigator)) {
    console.error("Geolocation is not available");
    return { latitude: 0, longitude: 0 };
  }

  const pos = (await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })) as GeolocationPosition;

  return {
    longitude: pos.coords.longitude,
    latitude: pos.coords.latitude,
  };
};
