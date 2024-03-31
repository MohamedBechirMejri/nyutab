import Settings from "types/settings";
import { getUserLocation } from "./locationUtils";

export const FAVORITES = [
  {
    icon: "/images/logos/gmail.webp",
    url: "https://mail.google.com/",
  },
  {
    icon: "/images/logos/linkedin.webp",
    url: "https://www.linkedin.com/",
  },
  {
    icon: "/images/logos/github.webp",
    url: "https://www.github.com",
  },
  {
    icon: "/images/logos/upwork.webp",
    url: "https://www.upwork.com",
  },
  {
    icon: "/images/logos/youtube.webp",
    url: "https://www.youtube.com",
  },
  {
    icon: "/images/logos/brilliant.webp",
    url: "https://www.brilliant.org",
  },
  {
    icon: "/images/logos/khanacademy.webp",
    url: "https://www.khanacademy.org/",
  },
  {
    icon: "/images/logos/googlepodcasts.webp",
    url: "https://podcasts.google.com/",
  },
  {
    icon: "/images/logos/spotify.webp",
    url: "https://www.spotify.com",
  },
  {
    icon: "/images/logos/reddit.webp",
    url: "https://www.reddit.com",
  },
  {
    icon: "/images/logos/twitter.webp",
    url: "https://www.twitter.com",
  },
  {
    icon: "/images/logos/facebook.webp",
    url: "https://www.facebook.com",
  },
];

export const MEMES = {
  isNsfwEnabled: true,
  sources: [
    { name: "memes", isEnabled: true },
    { name: "me_irl", isEnabled: true },
    { name: "dankmemes", isEnabled: true },
    { name: "AdviceAnimals", isEnabled: true },
    { name: "wholesomememes", isEnabled: true },
    { name: "terriblefacebookmemes", isEnabled: true },
    { name: "funny", isEnabled: true },
    { name: "HistoryMemes", isEnabled: true },
    { name: "Animemes", isEnabled: true },
  ],
};

export const FAVORITES_URLS = [
  "https://mail.google.com/",
  "https://www.linkedin.com/",
  "https://www.github.com",
  "https://www.upwork.com",
  "https://www.youtube.com",
  "https://www.brilliant.org",
  "https://www.khanacademy.org/",
  "https://podcasts.google.com/",
  "https://www.spotify.com",
  "https://www.reddit.com",
  "https://www.twitter.com",
  "https://www.facebook.com",
];

export const getDefaults: () => Promise<Settings> = async () => {
  const userLocation = await getUserLocation();

  return {
    position: userLocation!,
    favorites: FAVORITES_URLS,
    memes: MEMES,
    feed: {
      rss: {
        sources: [
          {
            isEnabled: true,
            name: "Hacker News",
            url: "https://hnrss.org/frontpage",
          },
          {
            isEnabled: true,
            name: "The New York Times",
            url: "https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/section/world/rss.xml",
          },
          {
            isEnabled: true,
            name: "WikiPedia",
            url: "https://en.wikipedia.org/w/api.php?action=featuredfeed&feed=onthisday&feedformat=atom",
          },
        ],
      },
    },
  };
};
