const NextPrayerButton = ({ setOverlay }: { setOverlay: any }) => {
  // const settings = useContext(SettingsContext)!;

  // const [prayerTimes, setPrayerTimes] = useState<any>(null);
  // const [nextPrayer, setNextPrayer] = useState<any>(null);

  // useEffect(() => {
  //   const savedPrayerTimes = getPrayerTimes();
  //   const date = new Date().toString().slice(0, 15);

  //   if (!settings) return;

  //   if (
  //     savedPrayerTimes &&
  //     date === new Date(savedPrayerTimes.data.date).toString().slice(0, 15)
  //   ) {
  //     setPrayerTimes(savedPrayerTimes);
  //   } else {
  //     getApiPrayerTimes(settings.city).then(newPrayerTimes => {
  //       setPrayerTimes(newPrayerTimes);
  //       savePrayerTimes(newPrayerTimes);
  //     });
  //   }
  // }, [settings]);

  // useEffect(() => {
  //   if (!prayerTimes) return;
  //   setNextPrayer(getNextPrayer(prayerTimes)[0]);
  // }, [prayerTimes]);

  return (
    <div></div>
    // <RCountdown
    //   date={
    //     //  time > next prayer ? tomorrows date : today's date
    //     new Date(
    //       // `${
    //         // new Date().toString().slice(16, 21) > nextPrayer?.time
    //           // ? getTomorrowDate().toString().slice(0, 15)
    //           // : new Date().toString().slice(0, 15)
    //       // } ${nextPrayer?.time}`
    //     )
    //   }
    //   onComplete={() => {
    //     setNextPrayer(getNextPrayer(prayerTimes)[0]);
    //   }}
    //   renderer={props => {
    //     const { hours, minutes, seconds } = props.formatted;
    //     return (
    //       <Button
    //         name={`${nextPrayer?.name} in ${`${hours}:${minutes}:${seconds}`}`}
    //         className="text-teal-400 hover:bg-[#14b8a527]"
    //         handleClick={() => setOverlay("prayers")}
    //       />
    //     );
    //   }}
    // />
  );
};

export default NextPrayerButton;
