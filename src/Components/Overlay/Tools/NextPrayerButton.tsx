import Button from "../../Misc/Button";

const NextPrayerButton = ({ setOverlay }: { setOverlay: any }) => {
  return (
    <Button
      name="Fajr in 00:40:00"
      className="text-teal-400 hover:bg-[#14b8a527]"
      handleClick={() => setOverlay("Islam")}
    />
  );
};

export default NextPrayerButton;
