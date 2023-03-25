import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  type SVGProps,
  useState,
  type Dispatch,
  type SetStateAction,
  useRef,
} from "react";
import LanguageToggle from "~/components/LanguageToggle";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import * as Slider from "@radix-ui/react-slider";
import YouTube, { type YouTubePlayer, type YouTubeProps } from "react-youtube";

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

export function IcBaselinePause(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
    </svg>
  );
}

export function IcBaselineVideocamOff(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82L21 17.18V6.5zM3.27 2L2 3.27L4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.54-.18L19.73 21L21 19.73L3.27 2z"
      ></path>
    </svg>
  );
}

export function IcOutlineVideocamOff(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m9.56 8l-2-2l-4.15-4.14L2 3.27L4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.55-.18L19.73 21l1.41-1.41l-8.86-8.86L9.56 8zM5 16V8h1.73l8 8H5zm10-8v2.61l6 6V6.5l-4 4V7c0-.55-.45-1-1-1h-5.61l2 2H15z"
      ></path>
    </svg>
  );
}

const PlayBar = ({
  activeLangs,
  setLangs,
  player,
  currentTime,
  playerState,
  playerHidden,
  setPlayerHidden,
}: {
  activeLangs: string[];
  setLangs: Dispatch<SetStateAction<string[]>>;
  player: YouTubePlayer;
  currentTime: number;
  playerState: number;
  playerHidden: boolean;
  setPlayerHidden: Dispatch<SetStateAction<boolean>>;
}) => {
  const { query } = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  // const durationRef = useRef(player?.getDuration());
  const durationRef = player?.getDuration();

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

  const formatTime = (time: number) => {
    time = Math.round(time);
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    const secondsString = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${secondsString}`;
  };

  return (
    <div className="fixed bottom-0 left-0 h-[72px] w-full bg-[#212121]">
      <Slider.Root
        className="relative -mt-3 flex h-5 cursor-pointer touch-none select-none items-center"
        value={[currentTime]}
        onValueChange={(value) => {
          player?.seekTo(value[0]);
        }}
        max={durationRef}
        step={0.01}
        aria-label="Progress bar"
      >
        <Slider.Track className="relative h-[3px] grow rounded-full bg-white bg-opacity-10">
          <Slider.Range className="absolute h-full rounded-full bg-[#f00]" />
        </Slider.Track>
        <Slider.Thumb className="block h-3 w-3 rounded-[10px] bg-[#f00] shadow-[0_2px_10px] shadow-gray-700 focus:outline-none" />
      </Slider.Root>
      <div className="mt- px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="h-12 w-12">
              {(isPlaying || playerState === 1) && playerState !== 0 ? (
                <IcBaselinePause
                  onClick={() => {
                    player?.pauseVideo();
                    setIsPlaying(false);
                  }}
                  className="h-full w-full"
                />
              ) : (
                <IcBaselinePlayArrow
                  onClick={() => {
                    player?.playVideo();
                    setIsPlaying(true);
                  }}
                  className="h-full w-full"
                />
              )}
            </button>
            <span className="text-sm text-[#aaa]">{`${formatTime(
              currentTime
            )} / ${formatTime(durationRef)}`}</span>
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
          <div className="flex gap-6">
            <button>
              {playerHidden ? (
                <IcBaselineVideocamOff
                  className="h-6 w-6"
                  onClick={() => {
                    setPlayerHidden(false);
                  }}
                />
              ) : (
                <IcOutlineVideocamOff
                  className="h-6 w-6"
                  onClick={() => {
                    setPlayerHidden(true);
                  }}
                />
              )}
            </button>
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

const YoutubeEmbed = ({
  setPlayer,
  setCurrentTime,
  setPlayerState,
  playerHidden,
}: {
  setPlayer: Dispatch<SetStateAction<YouTubePlayer>>;
  setCurrentTime: Dispatch<SetStateAction<number>>;
  setPlayerState: Dispatch<SetStateAction<number>>;
  playerHidden: boolean;
}) => {
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

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    setPlayer(event.target);
    setInterval(() => {
      const currentTime = event.target.getCurrentTime();
      if (currentTime) {
        setCurrentTime(event.target.getCurrentTime());
        setPlayerState(event.target.getPlayerState());
      }
    }, 100);
  };

  const opts: YouTubeProps["opts"] = {
    height: "158",
    width: "280",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
    },
  };

  return (
    <div className="fixed bottom-24 left-0">
      <YouTube
        className={clsx({
          hidden: playerHidden,
        })}
        videoId={songData.videoLink?.split("=")[1]}
        opts={opts}
        onReady={onPlayerReady}
      />
    </div>
  );
};

const Song: NextPage<{ id: string }> = ({ id }) => {
  const { data: songData } = api.song.getById.useQuery(id);
  const [langs, setLangs] = useState([songData?.language as string]);
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [currentTime, setCurrentTime] = useState(0);
  const [playerState, setPlayerState] = useState(-1);
  const [playerHidden, setPlayerHidden] = useState(false);

  if (!songData) return <div>404</div>;

  return (
    <Layout>
      <Head>
        <title>{songData.title}</title>
      </Head>
      <LyricsComponent langs={langs} />
      <YoutubeEmbed
        {...{ setPlayer, setCurrentTime, setPlayerState, playerHidden }}
      />
      <PlayBar
        activeLangs={langs}
        setLangs={setLangs}
        {...{
          player,
          currentTime,
          playerState,
          playerHidden,
          setPlayerHidden,
        }}
      />
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
