import { type Language } from "@prisma/client";
import axios from "axios";
import clsx from "clsx";
import { type NextPage } from "next";
import Image from "next/image";
import { type ChangeEvent, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import { useComponentVisible, useDebouncedValue } from "~/utils/hooks";
import { lang } from "~/utils/lang";

// form data types exluding debounced values
interface FormValues {
  artistId: string;
  artistName: string;
  bio: string;
  artistCover: FileList;
  songId: string;
  songTitle: string;
  altSongTitle: string;
  videoLink: string;
  songCover: FileList;
  language: Language;
  lyrics: {
    language: Language;
    content: string;
  }[];
}

const Submit: NextPage = () => {
  const {
    register,
    setValue,
    watch,
    getValues,
    control,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    handleSubmit,
  } = useForm<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lyrics",
  });

  const isNewArtist = getValues("artistId") === "";
  const isNewSong = getValues("songId") === "";
  const [artistSet, setArtistSet] = useState(false);
  const [songSet, setSongSet] = useState(false);
  const [showNewArtistForm, setShowNewArtistForm] = useState(false);
  const [showNewSongForm, setShowNewSongForm] = useState(false);
  const [showSongForm, setShowSongForm] = useState(false);
  const [showLyricsForm, setShowLyricsForm] = useState(false);

  const [artistCoverPreview, setArtistCoverPreview] = useState("");
  const [songCoverPreview, setSongCoverPreview] = useState("");

  const {
    ref: artistUlRef,
    isComponentVisible: artistUlVisible,
    setIsComponentVisible: setArtistUlVisible,
  } = useComponentVisible(false);
  const {
    ref: songUlRef,
    isComponentVisible: songUlVisible,
    setIsComponentVisible: setSongUlVisible,
  } = useComponentVisible(false);

  const [debouncedArtistName] = useDebouncedValue(watch("artistName"), 500);
  const [debouncedsongTitle] = useDebouncedValue(watch("songTitle"), 500);

  const { data: artistData, isLoading: artistDataLoading } =
    api.artist.getListByName.useQuery(debouncedArtistName);
  const { data: songListData, isLoading: songListDataLoading } =
    api.song.getByArtistAndTitle.useQuery(
      {
        artistId: getValues("artistId"),
        title: debouncedsongTitle,
      },
      { enabled: !!getValues("artistId") }
    );
  const { data: songData } = api.song.getById.useQuery(getValues("songId"), {
    enabled: !!getValues("songId"),
  });
  const { mutate: createNewArtist } = api.artist.createNewArtist.useMutation();
  const { mutate: createNewSong } = api.song.createNewSong.useMutation();
  const { mutate: createNewTranslation } =
    api.lyrics.createNewTranslation.useMutation();

  useEffect(() => {
    if (songSet) {
      setValue(
        "lyrics.0.language",
        isNewSong ? getValues("language") : (songData?.language as Language)
      );
      setValue(
        "lyrics.0.content",
        isNewSong
          ? getValues("lyrics.0.content")
          : (songData?.lyrics[0]?.content as Language)
      );
    }
  }, [songData, isNewSong, songSet, getValues, setValue]);

  useEffect(() => {
    setShowNewArtistForm(false);
    setShowSongForm(false);
    setShowNewSongForm(false);
    setShowLyricsForm(false);
    reset({
      artistId: "",
      artistName: "",
      bio: "",
      songId: "",
      songTitle: "",
      altSongTitle: "",
      videoLink: "",
      language: undefined,
      lyrics: [
        {
          language: undefined,
          content: "",
        },
      ],
    });
    setArtistSet(false);
    setSongSet(false);
    setArtistCoverPreview("");
    setSongCoverPreview("");
  }, [isSubmitSuccessful, getValues, reset]);

  interface imageResponse {
    imageUrl: string;
  }

  const onSubmit = (data: FormValues) => {
    try {
      const imageToUpload = [
        data.artistCover ? data.artistCover[0] : null,
        data.songCover ? data.songCover[0] : null,
      ];
      const imgUrlArr: string[] = [];
      const promises: Promise<any>[] = [];
      for (const image of imageToUpload) {
        if (!data.artistCover && !data.songCover) {
          break;
        }

        if (!image) {
          imgUrlArr.push("");
          continue;
        }

        const fileType = encodeURIComponent(image.type);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);
        const promise = new Promise((resolve, reject) => {
          fileReader.onload = async () => {
            try {
              const { data: resp } = await axios.post<imageResponse>(
                "/api/uploadAndCompressImage",
                {
                  imageDataUrl: fileReader.result,
                  fileType,
                }
              );
              const imageUrl = resp.imageUrl;
              imgUrlArr.push(imageUrl);
              resolve(imageUrl);
            } catch (error) {
              reject(error);
            }
          };
        });
        promises.push(promise);
      }
      const cleanLyrics = data.lyrics.map((lyric) => {
        return {
          language: lyric.language,
          content: lyric.content
            .replace(/^\s*$(?:\r\n?|\n)/gm, "")
            .replace(/(\r\n|\n|\r)/gm, "\n"),
        };
      });
      Promise.all(promises)
        .then(() => {
          // console.log({
          //   ...data,
          //   artistCover: imgUrlArr[0] as string,
          //   songCover: imgUrlArr[1] as string,
          //   lyrics: cleanLyrics,
          // });
          // console.log("isNewArtist isNewSong", isNewArtist, isNewSong);
          if (isNewArtist && isNewSong) {
            // console.log("isNewArtist && isNewSong", isNewArtist, isNewSong);
            // console.log({
            //   ...data,
            //   artistCover: imgUrlArr[0] as string,
            //   songCover: imgUrlArr[1] as string,
            //   lyrics: cleanLyrics,
            // });
            createNewArtist({
              ...data,
              artistCover: imgUrlArr[0] as string,
              songCover: imgUrlArr[1] as string,
              lyrics: cleanLyrics,
            });
          } else if (!isNewArtist && isNewSong) {
            // console.log("!isNewArtist && isNewSong", isNewArtist, isNewSong);
            // console.log({
            //   ...data,
            //   songCover: imgUrlArr[1] as string,
            //   lyrics: cleanLyrics,
            // });
            createNewSong({
              ...data,
              songCover: imgUrlArr[1] as string,
              lyrics: cleanLyrics,
            });
          } else if (!isNewArtist && !isNewSong) {
            // console.log("!isNewArtist && !isNewSong", isNewArtist, isNewSong);
            cleanLyrics.shift();
            const cleanLyricsWithSongId = cleanLyrics.map((lyric, i) => {
              return {
                songId: getValues("songId"),
                language: lyric.language,
                content: lyric.content
                  .replace(/^\s*$(?:\r\n?|\n)/gm, "")
                  .replace(/(\r\n|\n|\r)/gm, "\n"),
              };
            });
            // console.log(cleanLyricsWithSongId);
            createNewTranslation(cleanLyricsWithSongId);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout className="pb-10">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="mb-5 rounded-lg bg-gray-900 p-5">
          <h1 className="mb-5 text-xl font-bold text-white">Artist</h1>
          <div className="relative">
            <input
              className="block w-full border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
              type="text"
              placeholder="Artist Name"
              onClick={() => setArtistUlVisible(true)}
              {...register("artistName", {
                required: true,
                minLength: 1,
                onChange: (e) => {
                  if (artistSet) {
                    setShowNewArtistForm(false);
                    setShowSongForm(false);
                    setShowNewSongForm(false);
                    setShowLyricsForm(false);
                    reset({
                      artistId: "",
                      artistName: getValues("artistName"),
                      bio: "",
                      songId: "",
                      songTitle: "",
                      altSongTitle: "",
                      videoLink: "",
                      language: undefined,
                      lyrics: [
                        {
                          language: undefined,
                          content: "",
                        },
                      ],
                    });

                    setArtistSet(false);
                    setSongSet(false);
                    setArtistCoverPreview("");
                    setSongCoverPreview("");
                  }
                },
              })}
            />
            {errors?.artistName?.type === "required" && (
              <p>This field is required</p>
            )}
            {errors?.artistName?.type === "minLength" && (
              <p>Artist name must be at least 1 character</p>
            )}
            {artistUlVisible && (
              <ul
                className={clsx("absolute w-full bg-gray-700")}
                ref={artistUlRef}
              >
                {artistDataLoading && <li className="p-2 px-3">Loading...</li>}
                {artistData?.map((artist) => (
                  <li
                    onClick={() => {
                      setValue("artistName", artist.name);
                      setValue("artistId", artist.id);
                      setArtistSet(true);

                      setArtistUlVisible(false);
                      setShowNewArtistForm(false);
                      setShowSongForm(true);
                      setShowNewSongForm(false);
                    }}
                    key={artist.id}
                    className={clsx(
                      "cursor-pointer p-2 px-3 hover:bg-gray-800",
                      {
                        "bg-gray-600": getValues("artistName") === artist.name,
                      }
                    )}
                  >
                    {artist.name}
                  </li>
                ))}
                {artistData ? (
                  artistData?.some(
                    (artist) =>
                      artist.name.toLowerCase() ===
                      getValues("artistName").toLowerCase()
                  ) ? null : (
                    <li
                      onClick={() => {
                        // make additional form visible
                        setValue("artistId", "");
                        setArtistSet(true);

                        setArtistUlVisible(false);
                        setShowSongForm(true);
                        setShowNewArtistForm(true);
                      }}
                      className="cursor-pointer p-2 px-3 hover:bg-gray-800"
                    >
                      {`Create new artist (${debouncedArtistName})`}
                    </li>
                  )
                ) : null}
              </ul>
            )}
          </div>
          <input type="hidden" {...register("artistId")} />
          {
            // additional form for new artist
            showNewArtistForm && (
              <div className="bg-red-900">
                <textarea
                  className="block w-full resize-none border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
                  cols={30}
                  rows={10}
                  placeholder="Artist Bio (Optional)"
                  {...register("bio")}
                ></textarea>
                <label
                  className="block text-sm text-gray-500"
                  htmlFor="artist-cover"
                >
                  Artist Cover Image
                </label>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  {...register("artistCover", {
                    required: true,
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files) {
                        const file = e.target.files[0];
                        if (file) {
                          setArtistCoverPreview(URL.createObjectURL(file));
                        }
                      }
                    },
                  })}
                />
                {artistCoverPreview && (
                  <Image
                    className="mt-4 rounded-lg"
                    src={artistCoverPreview}
                    alt="Artist Cover Preview"
                    width={200}
                    height={200}
                  />
                )}
                {errors?.artistCover?.type === "required" && (
                  <p>This field is required</p>
                )}
              </div>
            )
          }
        </div>
        {
          // additional form for song
          showSongForm && (
            <div className="mb-5 rounded-lg bg-gray-900 p-5">
              <h1 className="mb-5 text-xl font-bold text-white">Song</h1>
              <div className="relative">
                <input
                  className="block w-full border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
                  type="text"
                  placeholder="Song Title"
                  onClick={() => setSongUlVisible(true)}
                  {...register("songTitle", {
                    required: true,
                    minLength: 1,
                    onChange: (e) => {
                      if (songSet) {
                        setShowNewSongForm(false);
                        setShowLyricsForm(false);
                        reset({
                          artistId: getValues("artistId"),
                          artistName: getValues("artistName"),
                          bio: getValues("bio"),
                          artistCover: getValues("artistCover"),
                          songId: "",
                          songTitle: getValues("songTitle"),
                          altSongTitle: "",
                          videoLink: "",
                          language: undefined,
                          lyrics: [
                            {
                              language: undefined,
                              content: "",
                            },
                          ],
                        });
                        setSongSet(false);
                        setSongCoverPreview("");
                      }
                    },
                  })}
                />
                {errors?.songTitle?.type === "required" && (
                  <p>This field is required</p>
                )}
                {errors?.songTitle?.type === "minLength" && (
                  <p>Song name must be at least 1 character</p>
                )}
                {getValues("songTitle") &&
                  getValues("songTitle").length !== 0 &&
                  songUlVisible && (
                    <ul
                      className={clsx("absolute w-full bg-gray-700")}
                      ref={songUlRef}
                    >
                      {songListDataLoading && (
                        <li className="p-2 px-3">Loading...</li>
                      )}
                      {!isNewArtist &&
                        songListData?.map((song) => (
                          <li
                            onClick={() => {
                              setValue("songTitle", song.title);
                              setValue("songId", song.id);

                              setSongUlVisible(false);
                              setShowNewSongForm(false);
                              setShowLyricsForm(true);
                              setSongSet(true);
                            }}
                            key={song.id}
                            className={clsx(
                              "cursor-pointer p-2 px-3 hover:bg-gray-800",
                              {
                                "bg-gray-600":
                                  getValues("songTitle") === song.title,
                              }
                            )}
                          >
                            {song.title}
                          </li>
                        ))}
                      {isNewArtist ||
                      (songListData &&
                        !songListData.some(
                          (song) =>
                            song.title.toLowerCase() ===
                            getValues("songTitle").toLowerCase()
                        )) ? (
                        <li
                          onClick={() => {
                            // make additional form visible
                            setSongUlVisible(false);
                            setValue("songId", "");

                            setShowNewSongForm(true);
                            setShowLyricsForm(true);
                            setSongSet(true);
                          }}
                          className="cursor-pointer p-2 px-3 hover:bg-gray-800"
                        >
                          {`Create new song (${
                            isNewArtist
                              ? getValues("songTitle")
                              : debouncedsongTitle
                          })`}
                        </li>
                      ) : null}
                    </ul>
                  )}
              </div>
              <input type="hidden" {...register("songId")} />
              {
                // additional form for new song
                showNewSongForm && (
                  <div className="bg-red-900">
                    <input
                      className="block w-full border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
                      type="text"
                      placeholder="Alt Song Title (Optional)"
                      {...register("altSongTitle")}
                    />
                    <label
                      className="block text-sm text-gray-500"
                      htmlFor="language-select"
                    >
                      Song Language
                    </label>
                    <select
                      className="bg-gray-800"
                      {...register("language", {
                        required: true,
                        // validate: {
                        //   required: (value) => value !== "" && isNewSong,
                        // },
                        onChange: (e: ChangeEvent<HTMLSelectElement>) => {
                          setValue(
                            "lyrics.0.language",
                            e.target.value as Language
                          );
                        },
                      })}
                    >
                      {Object.keys(lang).map((keyName, i) => (
                        <option value={keyName} key={i}>
                          {lang[keyName as keyof typeof lang]}
                        </option>
                      ))}
                    </select>
                    {errors?.language?.type === "required" && (
                      <p>This field is required</p>
                    )}
                    <input
                      className="block w-full border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
                      type="text"
                      placeholder="Video Link"
                      {...register("videoLink", {
                        required: true,
                        // validate: {
                        //   required: (value) => value !== "" && isNewSong,
                        // },
                      })}
                    />
                    {errors?.videoLink?.type === "required" && (
                      <p>This field is required</p>
                    )}
                    <label
                      className="block text-sm text-gray-500"
                      htmlFor="song-cover"
                    >
                      Song Cover Image
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      {...register("songCover", {
                        required: true,

                        onChange: (e: ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files) {
                            const file = e.target.files[0];
                            if (file) {
                              setSongCoverPreview(URL.createObjectURL(file));
                            }
                          }
                        },
                      })}
                    />
                    {songCoverPreview && (
                      <Image
                        className="mt-4 rounded-lg"
                        src={songCoverPreview}
                        alt="Artist Cover Preview"
                        width={200}
                        height={200}
                      />
                    )}
                    {errors?.songCover?.type === "required" && (
                      <p>This field is required</p>
                    )}
                  </div>
                )
              }
            </div>
          )
        }
        {showLyricsForm && (
          <>
            <div className="mb-5 rounded-lg bg-gray-900 p-5">
              <h1 className="mb-5 text-xl font-bold text-white">Lyrics</h1>
              <button
                className="rounder-lg mb-5 bg-gray-800 py-2 px-3"
                type="button"
                onClick={() => {
                  append({
                    language: Object.keys(lang)[0] as Language,
                    content: "",
                  });
                }}
              >
                Add language
              </button>
              <div className="flex gap-6 overflow-x-scroll">
                <div>
                  <label
                    className="block text-sm text-gray-500"
                    htmlFor="lyric-language-select"
                  >
                    Lyric Language
                  </label>
                  <select
                    disabled
                    className="bg-gray-800"
                    {...register(`lyrics.0.language` as const, {
                      required: true,
                    })}
                  >
                    {Object.keys(lang).map((keyName, i) => (
                      <option value={keyName} key={i}>
                        {lang[keyName as keyof typeof lang]}
                      </option>
                    ))}
                  </select>
                  <textarea
                    className="block w-full resize-none border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
                    disabled={!isNewSong}
                    cols={60}
                    rows={40}
                    placeholder="Add lyric here"
                    {...register(`lyrics.0.content` as const, {
                      required: true,
                    })}
                  ></textarea>
                  {isNewSong &&
                    errors?.lyrics &&
                    errors?.lyrics[0]?.content?.type === "required" && (
                      <p>This field is required</p>
                    )}
                  <input hidden type="text" placeholder="Timestamp" />
                </div>
                {!isNewSong && (
                  <div>
                    <label
                      className="block text-sm text-gray-500"
                      htmlFor="lyric-language-select"
                    >
                      Lyric Language
                    </label>
                    <select
                      className="bg-gray-800"
                      {...register(`lyrics.1.language` as const, {
                        required: true,
                      })}
                    >
                      {Object.keys(lang).map((keyName, i) => {
                        if (!isNewSong && songData) {
                          const langAlreadyExist = songData?.lyrics.some(
                            (lyric) => lyric.language === keyName
                          );
                          if (!langAlreadyExist) {
                            return (
                              <option value={keyName} key={i}>
                                {lang[keyName as keyof typeof lang]}
                              </option>
                            );
                          }
                        } else {
                          return (
                            <option value={keyName} key={i}>
                              {lang[keyName as keyof typeof lang]}
                            </option>
                          );
                        }
                      })}
                    </select>
                    <textarea
                      className="block w-full resize-none border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
                      cols={60}
                      rows={40}
                      placeholder="Add lyric here"
                      {...register(`lyrics.1.content` as const, {
                        required: true,
                      })}
                    ></textarea>
                    {!isNewSong &&
                      errors?.lyrics &&
                      errors?.lyrics[1]?.content?.type === "required" && (
                        <p>This field is required</p>
                      )}
                    <input hidden type="text" placeholder="Timestamp" />
                  </div>
                )}
                {fields.map((item, index) => {
                  if ((isNewSong && index > 0) || (!isNewSong && index > 1)) {
                    return (
                      <div key={item.id}>
                        <label
                          className="block text-sm text-gray-500"
                          htmlFor="lyric-language-select"
                        >
                          Lyric Language
                        </label>
                        <select
                          className="bg-gray-800"
                          {...register(`lyrics.${index}.language` as const, {
                            required: true,
                          })}
                        >
                          {Object.keys(lang).map((keyName, i) => {
                            if (!isNewSong && songData) {
                              const langAlreadyExist = songData?.lyrics.some(
                                (lyric) => lyric.language === keyName
                              );
                              if (!langAlreadyExist) {
                                return (
                                  <option value={keyName} key={i}>
                                    {lang[keyName as keyof typeof lang]}
                                  </option>
                                );
                              }
                            } else {
                              return (
                                <option value={keyName} key={i}>
                                  {lang[keyName as keyof typeof lang]}
                                </option>
                              );
                            }
                          })}
                        </select>
                        <textarea
                          className="block w-full resize-none border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
                          cols={60}
                          rows={40}
                          placeholder="Add lyric here"
                          {...register(`lyrics.${index}.content` as const, {
                            required: true,
                          })}
                        ></textarea>
                        <input hidden type="text" placeholder="Timestamp" />
                        <button
                          className="rounder-lg mb-5 bg-gray-800 py-2 px-3"
                          type="button"
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <button
              className="rounder-lg mb-5 bg-gray-800 py-2 px-3"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </>
        )}
      </form>
    </Layout>
  );
};
export default Submit;
