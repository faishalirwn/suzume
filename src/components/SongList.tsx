import Image from "next/image";
import Link from "next/link";
import { api, type RouterOutputs } from "~/utils/api";

const SongList = () => {
  const { data: songData } = api.song.getAll.useQuery();

  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold">Trending</h1>
      <div className="flex items-center gap-6 overflow-x-scroll whitespace-nowrap">
        {songData?.map((song, i) => (
          <SongItem {...song} key={i} />
        ))}
        {songData?.map((song, i) => (
          <SongItem {...song} key={i} />
        ))}
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
    <div className="flex min-w-fit flex-col">
      <Link href={`/song/${id}`}>
        <Image
          className="mb-2 rounded-lg"
          src={cover}
          alt={`${title} - ${artist.name} Album Cover`}
          width={226}
          height={226}
        />
        <h1 className="text-lg font-medium">{title}</h1>
      </Link>
      <Link href={`/artist/${artist.id}`} className="text-white/70">
        {artist.name}
      </Link>
    </div>
  );
};

export default SongList;
