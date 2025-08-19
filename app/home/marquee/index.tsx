import { getFactsAndQuotes } from 'lib/localDataUtils'
import { useOverlayStore } from 'lib/stores'
import { useMemo } from 'react'
import M from 'react-fast-marquee'

const Marquee = () => {
  const FAQ = useMemo(
    () =>
      getFactsAndQuotes().map(fq => (
        <span key={fq.uniqueIdentifier} className={`${fq.author ? 'font-serif italic' : ''}`}>
          {fq.text} {fq.author ? `- ${fq.author}` : ''}
        </span>
      )),
    []
  )

  const { overlay } = useOverlayStore()

  return (
    <M
      play={!overlay}
      pauseOnHover
      speed={25}
      className="p-0 shadow-lg bg-black/25 backdrop-blur-3xl h-max"
    >
      <p className="flex h-full gap-20 p-2 cursor-default">{FAQ}</p>
    </M>
  )
}

export default Marquee
