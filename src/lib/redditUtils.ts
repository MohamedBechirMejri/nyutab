import axios from "axios";

export const getRandomMeme = async (
  subreddit: string
): Promise<{
  postLink: string;
  url: string;
  nsfw: boolean;
  pinned: boolean;
  preview: string[];
  is_video: boolean;
}> => {
  const req = await axios.get(
    `https://www.reddit.com/r/${subreddit || "memes"}/random.json`
  );

  if (req.data[0]) {
    const { over_18, permalink, pinned, url, thumbnail, is_video } =
      req.data[0].data.children[0].data;

    return !/\.(gif|png|jpg)$/.test(url)
      ? getRandomMeme(subreddit)
      : {
          postLink: `https://reddit.com${permalink}`,
          url,
          nsfw: over_18,
          pinned,
          preview: [thumbnail],
          is_video,
        };
  }

  if (req.data.data) {
    const { over_18, permalink, pinned, url, thumbnail, is_video } =
      req.data.data.children[0].data;

    return !/\.(gif|png|jpg)$/.test(url)
      ? getRandomMeme(subreddit)
      : {
          postLink: `https://reddit.com${permalink}`,
          url,
          nsfw: over_18,
          pinned,
          preview: [thumbnail],
          is_video,
        };
  }
  return getRandomMeme("memes");
};
