import { motion } from "framer-motion";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
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

  const buttonAnimation = {
    initial: {
      scale: 1,
    },
    whileHover: {
      x: [0, -5, 0, -5, 0],
    },
    whileTap: {
      scale: 0.65,
    },
  };

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
      className="w-full flex justify-center items-center h-full flex-col gap-32 pt-8 bg-slate-600 rounded-xl shadow-2xl relative"
    >
      {/* <h1 className="absolute top-8 left-8 text-xl">
        Hello, Let's setup your Homepage..
      </h1> */}
      <Theme theme={theme} setTheme={SetTheme} />
      <div className="flex items-center gap-24 text-4xl">
        <motion.button {...buttonAnimation}>
          <IoIosArrowBack />
        </motion.button>
        <motion.button
          {...buttonAnimation}
          whileHover={{
            x: [0, 5, 0, 5, 0],
          }}
        >
          <IoIosArrowForward />
          {/* <IoCheckmark /> */}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Setup;
