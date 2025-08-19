import { m } from 'framer-motion'
import { useSettingsStore } from 'lib/stores'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'

const FavoriteSites = () => {
  const { settings } = useSettingsStore()

  const sites = settings?.favorites || []

  return (
    <div className="relative flex flex-col items-center justify-start h-full p-4 overflow-scroll rounded-lg noscroll">
      <m.button
        className="mb-2 text-4xl shrink-0 sm:text-5xl"
        onClick={async () => {
          const { randomSite } = await fetch(
            'https://nyutab-api.vercel.app/api/v1/randomsite'
          ).then(res => res.json())
          window.open(randomSite, '_blank')
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
      >
        <GiPerspectiveDiceSixFacesRandom />
      </m.button>
      <div>
        {sites.map((site, i) => (
          <a
            key={`favorite-site-${i}-${site}`}
            href={site}
            className="flex items-center justify-center my-4 overflow-hidden transition-all duration-300 rounded-full size-max hover:ring-zinc-500 ring shrink-0 ring-transparent"
          >
            <img
              src={`https://www.google.com/s2/favicons?domain=${site}&sz=128`}
              alt={site}
              className="object-cover border rounded-full shadow-xl size-8 sm:size-11 border-zinc-500 bg-gray-500/50 backdrop-blur-3xl"
            />
          </a>
        ))}
      </div>
    </div>
  )
}

export default FavoriteSites
