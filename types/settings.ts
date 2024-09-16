type Settings = {
  favorites: string[];
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

export type SettingsTab = "memes" | "feed" | 'favorites' | "danger zone"; // | "location" ;
