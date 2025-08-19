import { getToday } from 'lib/dateUtils'
import { getLocalData, setLocalData } from 'lib/storageUtils'
import { useEffect, useState } from 'react'

type SPCardProps = {
  id: number
  title: string
  image: string
  synopsis: string
  alternative_titles: string
}

export default function SPCard({
  rawtitle,
  rawlink,
  anime: animeTitle,
  spl,
  ignored,
  setIgnored,
}: {
  rawtitle: string
  rawlink: string
  anime: string
  spl: string
  ignored: string[]
  setIgnored: (ignored: string[]) => void
}) {
  const titleArr = rawtitle.replace('[SubsPlease]', '').split(' ')
  const episode = titleArr.filter((t, i) => i < titleArr.length - 2).join(' ')

  const [anime, setAnime] = useState<SPCardProps | null>(null)
  const downloaded = getLocalData('downloaded') || []

  const [isDownloaded, setIsDownloaded] = useState(downloaded.includes(rawtitle))

  const isIgnored = ignored.includes(anime?.title ?? rawtitle)

  useEffect(() => {
    const cache = getLocalData('animeCache')

    const today = getToday()

    if (cache) {
      if (cache['today'] !== today) {
        setLocalData('animeCache', {
          today,
        })
      } else {
        const cachedData = cache[episode]
        if (cachedData) return setAnime(cachedData)
      }
    }

    ;(async () => {
      const res = await fetch(`https://nyutab-api.vercel.app/api/v1/anime?title=${animeTitle}`)
        .then(res => res.json())
        .catch(err => console.error(err))

      const latestCache = getLocalData('animeCache')
      const newCache = {
        ...(latestCache || {}),
        [episode]: res.res,
      }
      setLocalData('animeCache', newCache)
      setAnime(res.res)
    })()
  }, [episode])

  // const { image, synopsis, alternative_titles, title: MALTitle } = anime;

  const image = anime?.image || ''
  const synopsis = anime?.synopsis || 'synopsis: something went wrong'
  const alternative_titles = anime?.alternative_titles || 'altTitles: something went wrong'
  const MALTtitle = anime?.title || 'MALTitle: something went wrong'

  return (
    <div
      className="relative flex items-start gap-4 p-4 overflow-hidden font-bold rounded-2xl"
      style={{
        opacity: isDownloaded || isIgnored ? 0.5 : 1,
      }}
    >
      <img
        src={image || '/images/404.jpg'}
        alt={animeTitle + 'background'}
        className="absolute top-0 left-0 w-full h-full overflow-hidden rounded opacity-25 shrink-0 blur-3xl"
      />
      <img
        src={image || '/images/404.jpg'}
        alt={animeTitle}
        className="h-104 rounded overflow-hidden w-[18rem] shrink-0 z-10 relative"
        onError={e => {
          e.currentTarget.src = '/images/404.jpg'
        }}
      />
      <div className="relative z-10 flex flex-col justify-between h-full gap-4">
        <div>
          <span className="text-sm opacity-65">{alternative_titles}</span>
          <h1 className="text-2xl text-zinc-200">{episode}</h1>
        </div>
        <p className="text-base font-normal opacity-85 text-zinc-300">
          {(synopsis || '').replaceAll(/&nbsp;/g, ' ')}
        </p>
        <div className="flex items-center gap-8">
          <button
            className="p-2 rounded-xl hover:bg-orange-500/10 active:scale-[.99] bg-zinc-500/5 shadow-xl transition-all duration-300"
            onClick={() => {
              navigator.clipboard.writeText(animeTitle)
            }}
          >
            Copy Name
          </button>
          <button
            className="p-2 rounded-xl hover:bg-green-500/10 active:scale-[.99] bg-zinc-500/5 shadow-xl transition-all duration-300"
            onClick={() => {
              window.open('https://subsplease.org/shows/' + spl, '_blank')
            }}
          >
            Open in SP
          </button>
          <button
            className="p-2 rounded-xl hover:bg-blue-500/10 active:scale-[.99] bg-zinc-500/5 shadow-xl transition-all duration-300"
            onClick={() => {
              window.open(rawlink)
              const downloaded = getLocalData('downloaded') || []
              setLocalData('downloaded', [...downloaded, rawtitle])
              setIsDownloaded(true)
            }}
          >
            Download
          </button>

          <button
            className="p-2 rounded-xl hover:bg-red-500/10 active:scale-[.99] bg-zinc-500/5 shadow-xl transition-all duration-300"
            onClick={() => {
              const ignored = (getLocalData('ignored') || []) as string[]
              const isIgnored = ignored.includes(anime?.title ?? rawtitle)
              if (isIgnored) {
                setLocalData(
                  'ignored',
                  ignored.filter(t => t !== (anime?.title ?? rawtitle))
                )
                setIgnored(ignored.filter(t => t !== (anime?.title ?? rawtitle)))
              } else {
                setLocalData('ignored', [...ignored, anime?.title ?? rawtitle])
                setIgnored([...ignored, anime?.title ?? rawtitle])
              }
            }}
          >
            {isIgnored ? 'Unignore' : 'Ignore'}
          </button>
        </div>
      </div>
    </div>
  )
}
