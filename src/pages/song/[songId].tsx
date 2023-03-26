import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import superjson from "superjson";
import clsx from "clsx";
import {
  IcBaselineDragIndicator,
  IcBaselineLyrics,
  IcBaselinePause,
  IcBaselinePlayArrow,
  IcBaselineVideocamOff,
  IcOutlineLyrics,
  IcOutlineVideocamOff,
} from "~/components/Icons";
import * as Slider from "@radix-ui/react-slider";
import ReactPlayer from "react-player/youtube";
import * as Toggle from "@radix-ui/react-toggle";
import { motion } from "framer-motion";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import Link from "next/link";

const LanguageToggle = ({
  langs,
  activeLangs,
  setActiveLangs,
  karaokeMode,
}: {
  langs: string[];
  activeLangs: string[];
  setActiveLangs: (value: string[]) => void;
  karaokeMode: boolean;
}) => {
  if (karaokeMode) {
    return (
      <ToggleGroup.Root
        className="inline-flex space-x-px rounded "
        type="single"
        value={activeLangs[0]}
        onValueChange={(value) => {
          // Ensure at least one toggle is active
          if (value) {
            setActiveLangs([value]);
          }
        }}
        aria-label="Language"
      >
        {langs.map((lang, i) => (
          <ToggleGroup.Item
            className="flex h-[35px] w-[60px] items-center justify-center bg-[#1d1d1d] text-base leading-4 text-white first:rounded-l last:rounded-r hover:bg-[#353535] focus:z-10 focus:outline-none data-[state=on]:bg-white data-[state=on]:text-black"
            key={i}
            value={lang}
            aria-label={lang}
          >
            {lang}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    );
  } else {
    return (
      <ToggleGroup.Root
        className="inline-flex space-x-px rounded "
        type={"multiple"}
        value={activeLangs}
        onValueChange={(value) => {
          // Ensure at least one toggle is active
          console.log(value);
          if (value && value.length !== 0 && value.length <= 3) {
            setActiveLangs(value);
          }
        }}
        aria-label="Language"
      >
        {langs.map((lang, i) => (
          <ToggleGroup.Item
            className="flex h-[35px] w-[60px] items-center justify-center bg-[#1d1d1d] text-base leading-4 text-white first:rounded-l last:rounded-r hover:bg-[#353535] focus:z-10 focus:outline-none data-[state=on]:bg-white data-[state=on]:text-black"
            key={i}
            value={lang}
            aria-label={lang}
          >
            {lang}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    );
  }
};

const PlayBar = ({
  activeLangs,
  setActiveLangs,
  player,
  currentTime,
  playerHidden,
  setPlayerHidden,
  setPlaying,
  playing,
  duration,
  karaokeMode,
  setKaraokeMode,
}: {
  activeLangs: string[];
  setActiveLangs: Dispatch<SetStateAction<string[]>>;
  player: ReactPlayer;
  currentTime: number;
  playerHidden: boolean;
  setPlayerHidden: Dispatch<SetStateAction<boolean>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  playing: boolean;
  duration: number;
  karaokeMode: boolean;
  setKaraokeMode: Dispatch<SetStateAction<boolean>>;
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
        <Slider.Thumb className="block h-3 w-3 rounded-[10px] bg-[#f00] shadow-[0_2px_10px] shadow-gray-700 focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-white focus:outline-none" />
      </Slider.Root>
      <div className="mt- px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Toggle.Root
              aria-label="Toggle play/pause"
              className="h-12 w-12"
              pressed={playing}
              onPressedChange={(playing) => {
                setPlaying(playing);
              }}
            >
              {playing ? (
                <IcBaselinePause className="h-full w-full" />
              ) : (
                <IcBaselinePlayArrow className="h-full w-full" />
              )}
            </Toggle.Root>
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
              <Link href={`/song/${songData.id}`} className="hover:underline">
                <h1 className="font-medium leading-[1.2]">{songData.title}</h1>
              </Link>
              <Link
                href={`/artist/${songData.artist.id}`}
                className="hover:underline"
              >
                <span className="text-white/70">{songData.artist.name}</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Toggle.Root
              aria-label="Toggle karaoke mode"
              className="h-6 w-6"
              pressed={karaokeMode}
              onPressedChange={(karaokeMode) => {
                setKaraokeMode(karaokeMode);
              }}
            >
              {karaokeMode ? (
                <IcBaselineLyrics className="h-full w-full" />
              ) : (
                <IcOutlineLyrics className="h-full w-full" />
              )}
            </Toggle.Root>
            <Toggle.Root
              aria-label="Toggle player visibility"
              title={`${playerHidden ? "Show" : "Hide"} player`}
              className="h-6 w-6"
              pressed={playerHidden}
              onPressedChange={(pressed) => {
                setPlayerHidden(pressed);
              }}
            >
              {playerHidden ? (
                <IcBaselineVideocamOff className="h-full w-full" />
              ) : (
                <IcOutlineVideocamOff className="h-full w-full" />
              )}
            </Toggle.Root>
            <LanguageToggle
              {...{ langs: langArr, activeLangs, setActiveLangs, karaokeMode }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const LyricsComponent = ({
  langs,
  currentTime,
  player,
  karaokeMode,
  lyricsComponentRef,
}: {
  langs: string[];
  currentTime: number;
  player: ReactPlayer;
  karaokeMode: boolean;
  lyricsComponentRef: React.RefObject<HTMLDivElement>;
}) => {
  const { query } = useRouter();
  const [isScrolling, setIsScrolling] = useState(false);
  const { data: songData, isLoading } = api.song.getById.useQuery(
    query.songId as string
  );

  useEffect(() => {
    window.addEventListener("scroll", () => setIsScrolling(true));
    return () =>
      window.removeEventListener("scroll", () => setIsScrolling(false));
  }, []);

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
      ref={lyricsComponentRef}
      className={clsx(
        "h-[calc(100vh_-_140px)] overflow-y-scroll py-8",
        `bg-[#747777]`
      )}
    >
      <div className="flex justify-center gap-12">
        {songData.lyrics
          .filter((lyric) => langs.includes(lyric.language))
          .map((lyric, i) => {
            return (
              <div key={i} className="flex flex-col gap-4">
                {lyric.content.split("\n").map((line, j) => {
                  if (!karaokeMode) {
                    return (
                      <div key={j} className="text-xl font-medium">
                        {line}
                      </div>
                    );
                  }
                  return (
                    <div
                      ref={(node) => {
                        if (
                          node instanceof Element &&
                          passedLyrics.length === j + 1
                        ) {
                          const rect = node.getBoundingClientRect();
                          if (rect.top < 860 && rect.top > 70 && !isScrolling) {
                            node.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                              inline: "center",
                            });
                          }
                        }
                      }}
                      onClick={() => {
                        player.seekTo(timestamps[j] as number, "seconds");
                      }}
                      key={j}
                      className={clsx(
                        "cursor-pointer text-4xl font-bold text-black hover:text-white",
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
  lyricsComponentRef,
}: {
  setPlayer: Dispatch<SetStateAction<ReactPlayer | undefined>>;
  setCurrentTime: Dispatch<SetStateAction<number>>;
  playerHidden: boolean;
  setDuration: Dispatch<SetStateAction<number>>;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  lyricsComponentRef: React.RefObject<HTMLDivElement>;
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
    <motion.div
      className={clsx("fixed bottom-24 left-0 flex", {
        hidden: playerHidden,
      })}
      drag
      dragConstraints={lyricsComponentRef}
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
      <button className="h-6 w-6 cursor-move">
        <IcBaselineDragIndicator className="h-full w-full" />
      </button>
    </motion.div>
  );
  // return (
  //   <div
  //     className={clsx("fixed bottom-24 left-0", {
  //       hidden: playerHidden,
  //     })}
  //   >
  //     <ReactPlayer
  //       ref={(player) => {
  //         setPlayer(player as ReactPlayer);
  //       }}
  //       class
  //       url={songData.videoLink as string}
  //       width="280px"
  //       height="158px"
  //       // width="560px"
  //       // height="316px"
  //       playing={playing}
  //       controls={true}
  //       progressInterval={100}
  //       onPlay={() => {
  //         setPlaying(true);
  //       }}
  //       onPause={() => {
  //         setPlaying(false);
  //       }}
  //       onProgress={(progress) => {
  //         setCurrentTime(progress.playedSeconds);
  //       }}
  //       onDuration={(duration) => {
  //         setDuration(duration);
  //       }}
  //     />
  //   </div>
  // );
};

const Song: NextPage<{ id: string }> = ({ id }) => {
  const { data: songData } = api.song.getById.useQuery(id);
  const [activeLangs, setActiveLangs] = useState([
    songData?.language as string,
  ]);
  const [currentTime, setCurrentTime] = useState(0);
  const [playerHidden, setPlayerHidden] = useState(false);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [player, setPlayer] = useState<ReactPlayer>();
  const [karaokeMode, setKaraokeMode] = useState(true);
  const lyricsComponentRef = useRef<HTMLDivElement>(null);

  if (!songData) return <div>404</div>;

  return (
    <Layout>
      <Head>
        <title>{songData.title}</title>
      </Head>
      <LyricsComponent
        langs={activeLangs}
        currentTime={currentTime}
        player={player as ReactPlayer}
        karaokeMode={karaokeMode}
        lyricsComponentRef={lyricsComponentRef}
      />
      <YoutubeEmbed
        setPlayer={setPlayer}
        setCurrentTime={setCurrentTime}
        playerHidden={playerHidden}
        setDuration={setDuration}
        playing={playing}
        setPlaying={setPlaying}
        lyricsComponentRef={lyricsComponentRef}
      />
      <PlayBar
        activeLangs={activeLangs}
        setActiveLangs={setActiveLangs}
        player={player as ReactPlayer}
        currentTime={currentTime}
        playerHidden={playerHidden}
        setPlayerHidden={setPlayerHidden}
        setPlaying={setPlaying}
        playing={playing}
        duration={duration}
        karaokeMode={karaokeMode}
        setKaraokeMode={setKaraokeMode}
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
