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
  position: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  };
  feed: {
    rss: {
      sources: { name: string; url: string; isEnabled: boolean }[];
    };
  };
};
export default Settings;
