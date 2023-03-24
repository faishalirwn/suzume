import Image from "next/image";
import Link from "next/link";
import { api, type RouterOutputs } from "~/utils/api";

const SongList = () => {
  const { data: songData } = api.song.getAll.useQuery();

  return (
    <div>
      <h1>Trending</h1>
      <div className="flex gap-6 overflow-x-scroll whitespace-nowrap">
        {songData?.map((song, i) => (
          <SongItem {...song} key={i} />
        ))}
      </div>
    </div>
  );
};

type SongItemProps = RouterOutputs["song"]["getAll"][number];

const SongItem = (props: SongItemProps) => {
  const { id, artist, cover, title } = props;
  console.log(cover);
  return (
    <div className="flex flex-col">
      <Link href={`/song/${id}`}>
        <Image
          src={cover}
          alt={`${title} - ${artist.name} Album Cover`}
          width={150}
          height={150}
        />
        <h1>{title}</h1>
      </Link>
      <Link href={`/artist/${artist.id}`}>{artist.name}</Link>
    </div>
  );
};

export default SongList;
