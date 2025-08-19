const getStory = async (id: number) => {
  try {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    )
    const story = await response.json()
    return story
  } catch (error) {
    console.error(error)
  }
}

const getStories = async (url: string) => {
  try {
    const response = await fetch(url)
    const storyIds = await response.json()
    const stories = await Promise.all(storyIds.slice(0, 30).map(getStory))
    return stories
  } catch (error) {
    console.error(error)
  }
}

export default getStories
