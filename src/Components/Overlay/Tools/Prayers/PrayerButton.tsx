const PrayerButton = ({ setOverlay }: { setOverlay: any }) => {
  /*

  - get date
  - get tomorrow's date
  - check local data
  - if data === localdata date then set local data as state
    - else get city name + country name
    - test getting data using city else use country
    - organize prayer times fajr to fajr of tomorrow
      - generate timestamp each prayer
    - save data to local storage and state
  - get next prayer from organized data
    - filter past prayers : timestamp less than date.now, return [0]
  - add timestamp to rcountdown

  */
  return <div></div>;
};

export default PrayerButton;
