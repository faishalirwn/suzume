import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

const Artist: NextPage = () => {
  const { query } = useRouter();
  if (typeof query.artistId !== "string") return null;
  const { data: artistData, isLoading } = api.artist.getById.useQuery(
    query.artistId
  );
  if (isLoading) return <div>Loading...</div>;
  if (!artistData) return <div>Artist not found</div>;
  return (
    <Layout>
      <Head>
        <title>{artistData.name}</title>
      </Head>
      <Image
        src={artistData.cover}
        alt={`${artistData.name} cover`}
        width={150}
        height={150}
      />
      <h1>{artistData.name}</h1>
      <p>{artistData.bio}</p>
    </Layout>
  );
};

export default Artist;
