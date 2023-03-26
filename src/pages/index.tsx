import { type NextPage } from "next";
import Layout from "~/components/Layout";

import Image from "next/image";
import Link from "next/link";
import { api, type RouterOutputs } from "~/utils/api";

const SongList = () => {
  const { data: songData, isLoading } = api.song.getAll.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!songData) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold">Trending</h1>
      <div className="flex items-center gap-6 overflow-x-scroll whitespace-nowrap pb-8">
        {songData.map((song, i) => (
          <SongItem {...song} key={i} />
        ))}
      </div>
    </div>
  );
};

type SongItemProps = RouterOutputs["song"]["getAll"][number];

const SongItem = (props: SongItemProps) => {
  const { id, artist, cover, title } = props;

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
        <h1 className="text-lg font-medium hover:underline">{title}</h1>
      </Link>
      <Link
        href={`/artist/${artist.id}`}
        className="text-white/70 hover:underline"
      >
        {artist.name}
      </Link>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <Layout>
      <SongList />
    </Layout>
  );
};
export default Home;
