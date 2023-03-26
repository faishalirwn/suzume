import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import LanguageToggle from "~/components/LanguageToggle";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import superjson from "superjson";
import clsx from "clsx";
import {
  IcBaselinePause,
  IcBaselinePlayArrow,
  IcBaselineVideocamOff,
  IcOutlineVideocamOff,
} from "~/components/Icons";
import * as Slider from "@radix-ui/react-slider";
import ReactPlayer from "react-player/youtube";

const PlayBar = ({
  activeLangs,
  setLangs,
  player,
  currentTime,
  playerHidden,
  setPlayerHidden,
  setPlaying,
  playing,
  duration,
}: {
  activeLangs: string[];
  setLangs: Dispatch<SetStateAction<string[]>>;
  player: ReactPlayer;
  currentTime: number;
  playerHidden: boolean;
  setPlayerHidden: Dispatch<SetStateAction<boolean>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  playing: boolean;
  duration: number;
}) => {
  const { query } = useRouter();
  // const durationRef = player?.getDuration();

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
          player.seekTo(value[0] as number, "seconds");
        }}
        max={duration}
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
              {playing ? (
                <IcBaselinePause
                  onClick={() => {
                    setPlaying(false);
                  }}
                  className="h-full w-full"
                />
              ) : (
                <IcBaselinePlayArrow
                  onClick={() => {
                    setPlaying(true);
                  }}
                  className="h-full w-full"
                />
              )}
            </button>
            <span className="text-sm text-[#aaa]">{`${formatTime(
              currentTime
            )} / ${formatTime(duration)}`}</span>
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

const LyricsComponent = ({
  langs,
  currentTime,
  player,
}: {
  langs: string[];
  currentTime: number;
  player: ReactPlayer;
}) => {
  const { query } = useRouter();
  const [isScrolling, setIsScrolling] = useState(false);
  const activeLine = useRef<HTMLDivElement>();
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

  const timestamps = Array.from(Array(72).keys());
  const passedLyrics = timestamps.filter((timestamp) => {
    return currentTime >= timestamp;
  });

  return (
    <div
      className={clsx(
        "h-[calc(100vh_-_140px)] overflow-y-scroll py-8",
        `bg-[#747777]`
      )}
      onScroll={() => {
        setIsScrolling(true);
        setTimeout(() => {
          setIsScrolling(false);
        }, 1000);
      }}
    >
      <div className="flex justify-center">
        {songData.lyrics
          .filter((lyric) => langs.includes(lyric.language))
          .map((lyric, i) => {
            return (
              <div
                key={i}
                className="flex flex-col gap-4 text-4xl font-bold text-black"
              >
                {lyric.content.split("\\n").map((line, j) => {
                  return (
                    <div
                      ref={(node) => {
                        if (
                          node instanceof Element &&
                          passedLyrics.length === j + 1
                        ) {
                          activeLine.current = node;
                          const rect = node.getBoundingClientRect();
                          if (
                            rect.top < 825 &&
                            rect.top > 125 &&
                            !isScrolling
                          ) {
                            node.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                              inline: "center",
                            });
                          }
                        }
                      }}
                      onClick={(e) => {
                        player.seekTo(timestamps[j] as number, "seconds");
                        if (e.target instanceof Element) {
                          let rect = {} as DOMRect;
                          if (typeof activeLine.current !== "undefined") {
                            rect = activeLine.current.getBoundingClientRect();
                          }

                          e.target.scrollIntoView({
                            behavior:
                              rect && rect.top < 825 && rect.top > 125
                                ? "smooth"
                                : "auto",
                            block: "center",
                            inline: "center",
                          });
                        }
                      }}
                      key={j}
                      className={clsx(
                        "cursor-pointer hover:text-white",
                        {
                          "text-white": passedLyrics.length === j + 1,
                        },
                        {
                          "text-white/70": passedLyrics.length > j + 1,
                        }
                      )}
                    >
                      {line}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

const YoutubeEmbed = ({
  setPlayer,
  setCurrentTime,
  playerHidden,
  setDuration,
  playing,
  setPlaying,
}: {
  setPlayer: Dispatch<SetStateAction<ReactPlayer | undefined>>;
  setCurrentTime: Dispatch<SetStateAction<number>>;
  playerHidden: boolean;
  setDuration: Dispatch<SetStateAction<number>>;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
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

  return (
    <div
      className={clsx("fixed bottom-24 left-0", {
        hidden: playerHidden,
      })}
    >
      <ReactPlayer
        ref={(player) => {
          setPlayer(player as ReactPlayer);
        }}
        class
        url={songData.videoLink as string}
        width="280px"
        height="158px"
        // width="560px"
        // height="316px"
        playing={playing}
        controls={true}
        progressInterval={100}
        onPlay={() => {
          setPlaying(true);
        }}
        onPause={() => {
          setPlaying(false);
        }}
        onProgress={(progress) => {
          setCurrentTime(progress.playedSeconds);
        }}
        onDuration={(duration) => {
          setDuration(duration);
        }}
      />
    </div>
  );
};

const Song: NextPage<{ id: string }> = ({ id }) => {
  const { data: songData } = api.song.getById.useQuery(id);
  const [langs, setLangs] = useState([songData?.language as string]);
  const [currentTime, setCurrentTime] = useState(0);
  const [playerHidden, setPlayerHidden] = useState(false);
  // const [seeking, setSeeking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [player, setPlayer] = useState<ReactPlayer>();

  if (!songData) return <div>404</div>;

  return (
    <Layout>
      <Head>
        <title>{songData.title}</title>
      </Head>
      <LyricsComponent
        langs={langs}
        currentTime={currentTime}
        player={player as ReactPlayer}
      />
      <YoutubeEmbed
        setPlayer={setPlayer}
        setCurrentTime={setCurrentTime}
        playerHidden={playerHidden}
        setDuration={setDuration}
        playing={playing}
        setPlaying={setPlaying}
      />
      <PlayBar
        activeLangs={langs}
        setLangs={setLangs}
        player={player as ReactPlayer}
        currentTime={currentTime}
        playerHidden={playerHidden}
        setPlayerHidden={setPlayerHidden}
        setPlaying={setPlaying}
        playing={playing}
        duration={duration}
      />
    </Layout>
  );
};

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
