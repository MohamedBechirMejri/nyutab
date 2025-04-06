export type SettingsTab =
  | "feed"
  | "memes"
  | "favorites"
  | "danger zone"
  | "backup";

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
};

export default Settings;
