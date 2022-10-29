import { useEffect, useState } from "react"
import axios from "axios"

const Memes = () => {
  const [meme, setMeme] = useState(null) as any

  // TODO: add history, nsfw filter, more subs (from localstorage)

  const getMeme = () => {
    axios
      .get("https://meme-api.herokuapp.com/gimme")
      .then(res => setMeme(res.data))
  }

  useEffect(() => {
    getMeme()
  }, [])

  return (
    <div className="flex justify-center w-full h-full overflow-scroll rounded-xl">
      {meme ? (
        <div>
          <img src={meme.url} alt="" className="h-full rounded" />
        </div>
      ) : (
        "loading"
      )}
    </div>
  )
}

export default Memes
