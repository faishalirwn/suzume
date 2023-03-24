import { type Lyric } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import LanguageToggle from "~/components/LanguageToggle";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

const Song: NextPage = () => {
  const { query } = useRouter();
  const [langs, setLangs] = useState(["JA"]);
  const songQuery = api.song.getById.useQuery(query.songId as string);

  const langArr = songQuery.data?.lyrics?.reduce((acc, lyric) => {
    acc.push(lyric.language);
    return acc;
  }, [] as string[]);

  return (
    <Layout>
      <Head>
        <title>{songQuery.data?.title}</title>
      </Head>
      <div className="max-h-[calc(100vh_-_96px)] overflow-y-scroll py-8">
        <div className="flex justify-center">
          {songQuery.data?.lyrics
            ?.filter((lyric, i) => langs.includes(lyric.language))
            .map((lyric, i) => (
              <div key={i}>
                {lyric.content.split("\n").map((line, j) => (
                  <div key={j}>{line}</div>
                ))}
              </div>
            ))}
        </div>
        <div className="fixed bottom-24 left-0">
          <iframe
            width="280"
            height="158"
            src={
              songQuery.data?.videoLink?.replace("watch?v=", "embed/") as string
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="fixed bottom-0 left-0 h-[72px] w-full bg-[#212121]">
          <div className="flex justify-between">
            <div>
              <button>play</button>
            </div>
            <div className="flex">
              <Image
                src={songQuery.data?.cover as string}
                alt={`${songQuery.data?.title as string} cover`}
                width={150}
                height={150}
              />
              <div className="flex flex-col">
                <h1>{songQuery.data?.artist.name}</h1>
                <p>{songQuery.data?.title}</p>
              </div>
            </div>
            <div>
              <LanguageToggle
                langs={langArr as string[]}
                activeLangs={langs}
                setLangs={setLangs}
              />
            </div>
          </div>
          <p className="hidden">{songQuery.data?.arranger}</p>
          <p className="hidden">{songQuery.data?.composer}</p>
          <p className="hidden">{songQuery.data?.lyricist}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Song;
