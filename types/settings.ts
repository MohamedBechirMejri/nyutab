type Settings = {
  ai: {
    apiKey: string;
    savedKeys: string[];
    model: string;
    defaultMode?: string;
  };
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
};

export default Settings;

export type SettingsTab = "memes" | "feed" | "favorites" | "danger zone"; // | "location" ;
