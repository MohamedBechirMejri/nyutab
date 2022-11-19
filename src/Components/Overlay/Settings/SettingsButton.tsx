import Button from "../../Misc/Button";

const SettingsButton = ({ setOverlay }: { setOverlay: any }) => {
  return (
    <Button
      name="Settings"
      className="text-[#895bf3] hover:bg-[#895bf327] bg-[#895bf311]"
      handleClick={() => setOverlay("settings")}
    />
  );
};

export default SettingsButton;
