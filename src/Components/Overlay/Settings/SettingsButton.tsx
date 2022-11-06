const SettingsButton = ({ setOverlay }: { setOverlay: any }) => {
  return (
    <button
      className="w-full h-full transition-all border border-current rounded-lg text-violet-500 active:scale-95 hover:bg-[#895bf327]"
      onClick={() => setOverlay("settings")}
    >
      Settings
    </button>
  );
};

export default SettingsButton;
