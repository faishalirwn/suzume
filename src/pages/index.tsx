import { type NextPage } from "next";
import Layout from "~/components/Layout";

import Image from "next/image";
import Link from "next/link";
import { api, type RouterOutputs } from "~/utils/api";

const SongList = ({
  title,
  songItems,
}: {
  title: string;
  songItems: JSX.Element[];
}) => {
  return (
    <div>
      <div>
        <h1 className="mb-6 text-4xl font-bold">{title}</h1>
        <div className="flex items-center gap-6 overflow-x-scroll whitespace-nowrap pb-8">
          {songItems}
        </div>
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
  const { data: songData, isLoading } = api.song.getAll.useQuery();

  if (isLoading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  if (!songData) {
    return (
      <Layout>
        <p>Something went wrong</p>
      </Layout>
    );
  }

  const songItems1 = songData.map((song, i) => <SongItem {...song} key={i} />);

  const songItems2 = songItems1.splice(0, Math.round(songItems1.length / 2));

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <SongList title="Trending" songItems={songItems2} />
        <SongList title="New Releases" songItems={songItems1} />
      </div>
    </Layout>
  );
};
export default Home;
