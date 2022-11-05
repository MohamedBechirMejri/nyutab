import { motion } from "framer-motion";
import { useState } from "react";
import Theme from "./Theme";

const Setup = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Google",
      url: "https://www.google.com",
    },
    {
      id: 2,
      name: "Facebook",
      url: "https://www.facebook.com",
    },
    {
      id: 3,
      name: "Youtube",
      url: "https://www.youtube.com",
    },
    {
      id: 4,
      name: "Amazon",
      url: "https://www.amazon.com",
    },
    {
      id: 5,
      name: "Netflix",
      url: "https://www.netflix.com",
    },
    {
      id: 6,
      name: "Spotify",
      url: "https://www.spotify.com",
    },
    {
      id: 7,
      name: "Twitch",
      url: "https://www.twitch.com",
    },
    {
      id: 8,
      name: "Github",
      url: "https://www.github.com",
    },
    {
      id: 9,
      name: "Reddit",
      url: "https://www.reddit.com",
    },
    {
      id: 10,
      name: "Twitter",
      url: "https://www.twitter.com",
    },
    {
      id: 11,
      name: "Instagram",
      url: "https://www.instagram.com",
    },
    {
      id: 12,
      name: "Twitch",
      url: "https://www.twitch.com",
    },
  ]);

  const [theme, SetTheme] = useState({
    primary: "#35363a",
    secondary: "#303034",
    text: "#f5f5f5",
  });

  return (
    <motion.div
      initial={{
        scaleY: 0,
      }}
      animate={{
        scaleY: 1,
      }}
      transition={{
        delay: 0.5,
      }}
      className="w-full flex justify-center items-center h-full flex-col gap-8 pt-8 bg-slate-600 rounded-xl shadow-2xl"
    >
      <Theme theme={theme} setTheme={SetTheme} />
    </motion.div>
  );
};

export default Setup;
