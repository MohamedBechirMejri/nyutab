type Settings = {
  theme: {
    primary: string;
    secondary: string;
    text: string;
  };
  favorites: { name: string; url: string; icon: string; id: number }[];
};
export default Settings;
