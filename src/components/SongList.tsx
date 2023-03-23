import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";

const SongList = () => {
  const { data: songData } = api.song.getAll.useQuery();

  return (
    <div>
      <h1>Trending</h1>
      <div className="flex gap-6 overflow-x-scroll whitespace-nowrap">
        {songData?.map((song, i) => (
          <SongItem
            songId={song.id}
            artistId={song.artist.id}
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

type SongItemProps = {
  artistId: string;
  songId: string;
  imgSrc: string;
  title: string;
  artist: string;
};

const SongItem = ({
  songId,
  artistId,
  imgSrc,
  title,
  artist,
}: SongItemProps) => {
  return (
    <div className="flex flex-col">
      <Link href={`/song/${songId}`}>
        <Image
          src={imgSrc}
          alt={`${title} - ${artist} Album Cover`}
          width={150}
          height={150}
        />
        <h1>{title}</h1>
      </Link>
      <Link href={`/artist/${artistId}`}>{artist}</Link>
    </div>
  );
};

export default SongList;
