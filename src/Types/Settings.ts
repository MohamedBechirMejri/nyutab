type Settings = {
  theme: {
    primary: string;
    secondary: string;
    text: string;
  };
  favorites: { name: string; url: string; icon: string; id: number }[];
  memes: {
    isNsfwEnabled: boolean;
    sources: { name: string; isEnabled: boolean }[];
  };
  location: {
    city: string;
    country: string;
  };
};
export default Settings;
