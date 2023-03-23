import { type NextPage } from "next";

import SongList from "~/components/SongList";
import Layout from "~/components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <SongList />
    </Layout>
  );
};
export default Home;
