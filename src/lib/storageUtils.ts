export const saveSettings = (settings: {
  theme: {
    primary: string;
    secondary: string;
    text: string;
  };
  favorites: { name: string; url: string; icon: string; id: number }[];
}) => {
  localStorage.setItem("settings", JSON.stringify(settings));
};

export const getSettings = () => {
  return localStorage.getItem("settings");
};
