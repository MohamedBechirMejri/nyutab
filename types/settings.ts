type Settings = {
  favorites: { name: string; url: string; icon: string; id: number }[];
  memes: {
    isNsfwEnabled: boolean;
    sources: { name: string; isEnabled: boolean }[];
  };
  position: {
    latitude: number;
    longitude: number;
    // city: string;
    // country: string;
  };
  feed: {
    rss: {
      sources: { name: string; url: string; isEnabled: boolean }[];
    };
  };
} | null;

export default Settings;

export type SettingsTab = "memes" | "feed" // | "location" ;
