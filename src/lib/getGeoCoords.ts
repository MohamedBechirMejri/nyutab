const getGeoCoords = () => {
  let coords = {
    latitude: 0,
    longitude: 0,
  };
  navigator.geolocation.getCurrentPosition(position => {
    coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  });
  return coords;
};
export default getGeoCoords;
