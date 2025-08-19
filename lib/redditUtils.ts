import { getRandomNumber } from './mathUtils'

export const getRandomMeme = async (
  subreddit: string,
  retries = 0
): Promise<{
  postLink: string
  url: string
  nsfw: boolean
  pinned: boolean
  preview: string[]
  is_video: boolean
}> => {
  if (retries > 5) {
    throw new Error('Failed to fetch meme after 5 retries')
  }

  const res = await fetch(`https://www.reddit.com/r/${subreddit || 'memes'}.json`)
    .then(res => res.json())
    .catch(err => {
      console.log(err)
      return getRandomMeme(subreddit, retries + 1)
    })

  if (res[0]) {
    const { over_18, permalink, pinned, url, thumbnail, is_video } =
      res[0].data.children[getRandomNumber(res[0].data.children.length)].data

    console.log(url)

    return !/\.(gif|png|jpg)$/.test(url)
      ? getRandomMeme(subreddit, retries + 1)
      : {
          postLink: `https://reddit.com${permalink}`,
          url,
          nsfw: over_18,
          pinned,
          preview: [thumbnail],
          is_video,
        }
  }

  if (res.data) {
    const { over_18, permalink, pinned, url, thumbnail, is_video } =
      res.data.children[getRandomNumber(res.data.children.length)].data

    return !/\.(gif|png|jpg)$/.test(url)
      ? getRandomMeme(subreddit, retries + 1)
      : {
          postLink: `https://reddit.com${permalink}`,
          url,
          nsfw: over_18,
          pinned,
          preview: [thumbnail],
          is_video,
        }
  }

  return getRandomMeme('memes', retries + 1)
}
