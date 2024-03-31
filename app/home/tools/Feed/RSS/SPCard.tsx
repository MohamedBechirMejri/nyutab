type SPCardProps = {
  link: string;
  episode: string;
  id: number;
  title: string;
  image: string;
  synopsis: string;
  alternative_titles: string;
};

export default function SPCard({
  link,
  episode,
  id,
  title,
  image,
  synopsis,
  alternative_titles,
}: SPCardProps) {
  return (
    <a href={link}>
      <div className="flex flex-col p-4 font-bold text-black transition-all bg-white bg-opacity-50 rounded-2xl hover:bg-opacity-70 active:scale-[.99]">
        <img
          src={image}
          className="object-contain object-left w-[10rem] h-[1rem] rounded"
          alt={title}
        />
        <span className="text-xl">{title}</span>
        <br />
        <p>{synopsis.replaceAll(/\&nbsp\;/g, " ")}</p>
      </div>
    </a>
  );
}

/*


  {

      link:

        'magnet:?xt=urn:btih:WIDBF57AJUI6JRKBGESBY6MH7Y7N6K5Y&dn=[SubsPlease]+Shangri-La+Frontier+-+25+%281080p%29+[342DBE67].mkv&xl=1558574621&tr=htt ',

      episode: '[SubsPlease] Shangri-La Frontier - 25 (1080p) [342DBE67].mkv',

      id: 5220,

      title: 'Shangri-La',

      image: 'https://cdn.myanimelist.net/images/anime/1780/121358l.jpg',

      synopsis:


    },


*/
