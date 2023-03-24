import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { type SVGProps, useState } from "react";
import LanguageToggle from "~/components/LanguageToggle";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import * as Slider from "@radix-ui/react-slider";

import { FastAverageColor } from "fast-average-color";

export function IcBaselinePlayArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="currentColor" d="M8 5v14l11-7z"></path>
    </svg>
  );
}

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
      <Slider.Root
        className="relative -mt-2 flex h-5 touch-none select-none items-center"
        defaultValue={[50]}
        max={100}
        step={1}
        aria-label="Volume"
      >
        <Slider.Track className="relative h-[3px] grow rounded-full bg-gray-900">
          <Slider.Range className="absolute h-full rounded-full bg-white" />
        </Slider.Track>
        <Slider.Thumb className="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-gray-700 hover:bg-gray-500 focus:shadow-[0_0_0_5px] focus:shadow-gray-800 focus:outline-none" />
      </Slider.Root>
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="h-12 w-12">
              <IcBaselinePlayArrow className="h-full w-full" />
            </button>
            <span className="text-sm text-[#aaa]">0:00 / 4:00</span>
          </div>
          <div className="flex items-center gap-3">
            <Image
              className="rounded-sm"
              src={songData.cover}
              alt={`${songData.title} cover`}
              width={50}
              height={50}
            />
            <div className="flex flex-col">
              <h1 className="font-medium leading-[1.2]">{songData.title}</h1>
              <div className="text-white/70">
                <span>{songData.artist.name}</span>
                <span> • </span>
                <span>{songData.releaseDate.getFullYear()}</span>
              </div>
            </div>
          </div>
          <div>
            <LanguageToggle {...{ langs: langArr, activeLangs, setLangs }} />
          </div>
          <p className="hidden">{songData.arranger}</p>
          <p className="hidden">{songData.composer}</p>
          <p className="hidden">{songData.lyricist}</p>
        </div>
      </div>
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

  // const getAverageColor = async (imgSrc: string) => {
  //   const img = document.createElement("img");
  //   img.crossOrigin = "anonymous";
  //   img.src = `${imgSrc}?dummy=parameter`;
  //   const fac = new FastAverageColor();
  //   try {
  //     const color = await fac.getColorAsync(img);
  //     return color.hex;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div
      className={clsx(
        "h-[calc(100vh_-_140px)] overflow-y-scroll py-8",
        `bg-[#747777]`
      )}
    >
      <div className="flex justify-center">
        {songData.lyrics
          .filter((lyric) => langs.includes(lyric.language))
          .map((lyric, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 text-4xl font-bold text-black"
            >
              {lyric.content.split("\n").map((line, j) => (
                <div
                  key={j}
                  className={clsx("cursor-pointer hover:text-white", {
                    "text-white/70": j < lyric.content.split(`\n`).length / 2,
                    "text-white": j === lyric.content.split(`\n`).length / 2,
                  })}
                >
                  {line}
                </div>
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
        <p>loading...</p>
      </div>
    );
  if (!songData)
    return (
      <div className="fixed bottom-24 left-0">
        <p>no data</p>
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

const Song: NextPage<{ id: string }> = ({ id }) => {
  const { data: songData } = api.song.getById.useQuery(id);
  const [langs, setLangs] = useState([songData?.language as string]);

  if (!songData) return <div>404</div>;

  return (
    <Layout>
      <Head>
        <title>{songData.title}</title>
      </Head>
      <LyricsComponent langs={langs} />
      <YoutubeEmbed />
      <PlayBar activeLangs={langs} setLangs={setLangs} />
    </Layout>
  );
};
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import superjson from "superjson";
import clsx from "clsx";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {
      prisma: prisma,
      session: null,
    },
    transformer: superjson,
  });

  const id = context.params?.songId;
  console.log("context.params", context.params);
  console.log("id", id);

  if (typeof id !== "string") throw new Error("invalid id");

  await ssg.song.getById.prefetch(id);

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Song;
