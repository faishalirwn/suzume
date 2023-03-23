import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";

const SongList = () => {
  const { data: songData } = api.song.getAll.useQuery();
  console.log(songData);

  return (
    <div>
      <h1>Trending</h1>
      <div className="flex gap-6 overflow-x-scroll whitespace-nowrap">
        {songData?.map((song, i) => (
          <SongItem
            key={i}
            imgSrc={song.cover}
            artist={song.artist.name}
            title={song.title}
          />
        ))}
      </div>
    </div>
  );
};

const SongItem = ({
  imgSrc,
  title,
  artist,
}: {
  imgSrc: string;
  title: string;
  artist: string;
}) => {
  return (
    <Link href={`/test`}>
      <Image
        src={imgSrc}
        alt={`${title} - ${artist} Album Cover`}
        width={150}
        height={150}
      />
      <h1>{title}</h1>
      <p>{artist}</p>
    </Link>
  );
};

export default SongList;
