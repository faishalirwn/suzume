import { type Lyric } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import LanguageToggle from "~/components/LanguageToggle";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

const PlayBar = ({
  activeLangs,
  setLangs,
}: {
  activeLangs: string[];
  setLangs: (value: string[]) => void;
}) => {
  const { query } = useRouter();
  const { data: songData, isLoading } = api.song.getById.useQuery(
    query.songId as string
  );

  if (isLoading)
    return (
      <div className="fixed bottom-0 left-0 h-[72px] w-full bg-[#212121]">
        <div>loading</div>
      </div>
    );
  if (!songData)
    return (
      <div className="fixed bottom-0 left-0 h-[72px] w-full bg-[#212121]">
        <div>no data</div>
      </div>
    );

  const langArr = songData.lyrics.reduce((acc, lyric) => {
    acc.push(lyric.language);
    return acc;
  }, [] as string[]);
  return (
    <div className="fixed bottom-0 left-0 h-[72px] w-full bg-[#212121]">
      <div className="flex justify-between">
        <div>
          <button>play</button>
        </div>
        <div className="flex">
          <Image
            src={songData.cover}
            alt={`${songData.title} cover`}
            width={150}
            height={150}
          />
          <div className="flex flex-col">
            <h1>{songData.artist.name}</h1>
            <p>{songData.title}</p>
          </div>
        </div>
        <div>
          <LanguageToggle {...{ langs: langArr, activeLangs, setLangs }} />
        </div>
      </div>
      <p className="hidden">{songData.arranger}</p>
      <p className="hidden">{songData.composer}</p>
      <p className="hidden">{songData.lyricist}</p>
    </div>
  );
};

const LyricsComponent = ({ langs }: { langs: string[] }) => {
  const { query } = useRouter();
  const { data: songData, isLoading } = api.song.getById.useQuery(
    query.songId as string
  );
  if (isLoading)
    return (
      <div className="max-h-[calc(100vh_-_140px)] overflow-y-scroll py-8">
        <div className="flex justify-center">
          <p>loading</p>
        </div>
      </div>
    );
  if (!songData)
    return (
      <div className="max-h-[calc(100vh_-_140px)] overflow-y-scroll py-8">
        <div className="flex justify-center">
          <p>no data</p>
        </div>
      </div>
    );
  return (
    <div className="max-h-[calc(100vh_-_140px)] overflow-y-scroll py-8">
      <div className="flex justify-center">
        {songData.lyrics
          .filter((lyric, i) => langs.includes(lyric.language))
          .map((lyric, i) => (
            <div key={i}>
              {lyric.content.split("\n").map((line, j) => (
                <div key={j}>{line}</div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

const YoutubeEmbed = () => {
  const { query } = useRouter();
  const { data: songData, isLoading } = api.song.getById.useQuery(
    query.songId as string
  );
  if (isLoading)
    return (
      <div className="fixed bottom-24 left-0">
        <p>loading...</p>{" "}
      </div>
    );
  if (!songData)
    return (
      <div className="fixed bottom-24 left-0">
        <p>no data</p>{" "}
      </div>
    );
  return (
    <div className="fixed bottom-24 left-0">
      <iframe
        width="280"
        height="158"
        src={songData.videoLink?.replace("watch?v=", "embed/")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const Song: NextPage = () => {
  const [langs, setLangs] = useState(["JA"]);
  const { query } = useRouter();
  const { data: songData } = api.song.getById.useQuery(query.songId as string);

  return (
    <Layout>
      <Head>
        <title>{songData?.title}</title>
      </Head>
      <LyricsComponent langs={langs} />
      <YoutubeEmbed />
      <PlayBar activeLangs={langs} setLangs={setLangs} />
    </Layout>
  );
};

export default Song;
