import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

const Artist: NextPage = () => {
  const { query } = useRouter();
  if (typeof query.artistId !== "string") return null;
  const artistQuery = api.artist.getById.useQuery(query.artistId);
  return (
    <Layout>
      <Head>
        <title>{artistQuery.data?.name}</title>
      </Head>
      <Image
        src={artistQuery.data?.cover as string}
        alt={`${artistQuery.data?.name as string} cover`}
        width={150}
        height={150}
      />
      <h1>{artistQuery.data?.name}</h1>
      <p>{artistQuery.data?.bio}</p>
    </Layout>
  );
};

export default Artist;
