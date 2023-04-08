import clsx from "clsx";
import { type NextPage } from "next";
import { type ChangeEvent, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import { useComponentVisible, useDebouncedValue } from "~/utils/hooks";

// form data types exluding debounced values
type FormValues = {
  artistId: string;
  artistName: string;
  bio: string;
  artistCover: string;
  songId: string;
  songName: string;
  altSongTitle: string;
  videoLink: string;
  songCover: string;
  language: string;
  lyrics: {
    language: string | undefined;
    content: string;
  }[];
};

const Submit: NextPage = () => {
  const { register, setValue, watch, getValues, control, reset } =
    useForm<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lyrics",
  });

  // const [isNewArtist, setIsNewArtist] = useState(false);
  // const [isNewSong, setIsNewSong] = useState(isNewArtist);
  // const [newArtistName, setNewArtistName] = useState("");
  // const [newSongName, setNewSongName] = useState<string | undefined>(undefined);
  const isNewArtist = getValues("artistId") === "";
  const isNewSong = getValues("songId") === "";
  const [artistSet, setArtistSet] = useState(false);
  const [songSet, setSongSet] = useState(false);
  const [showNewArtistForm, setShowNewArtistForm] = useState(false);
  const [showNewSongForm, setShowNewSongForm] = useState(false);
  const [showSongForm, setShowSongForm] = useState(false);
  const [showLyricsForm, setShowLyricsForm] = useState(false);

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

  const [debouncedArtistName] = useDebouncedValue(
    // getValues("artistName"),
    getValues("artistName"),
    500
  );
  const [debouncedSongName] = useDebouncedValue(
    // getValues("artistName"),
    getValues("songName"),
    500,
    { leading: true }
  );

  const { data: artistData } =
    api.artist.getListByName.useQuery(debouncedArtistName);
  const { data: songListData } = api.song.getByArtistAndTitle.useQuery(
    {
      artistId: getValues("artistId"),
      title: debouncedSongName,
    },
    { enabled: !!getValues("artistId") }
  );
  const { data: songData } = api.song.getById.useQuery(getValues("songId"), {
    enabled: !!getValues("songId"),
  });

  useEffect(() => {
    if (songSet) {
      setValue(
        "lyrics.0.language",
        isNewSong ? getValues("language") : songData?.language
      );
    }
  }, [songData, isNewSong, songSet, getValues, setValue]);

  // useEffect(() => {
  //   reset({
  //     data: 'test'
  //   })
  // }, [isSubmitSuccessful])

  console.log(watch());
  console.log("isNewArtist", isNewArtist);
  console.log(
    isNewArtist === true ||
      songListData?.some(
        (song) =>
          song.title.toLowerCase() === getValues("songName").toLowerCase()
      )
  );
  console.log("songListData", songListData);
  console.log("songData", songData);

  // if (isNewArtist && newArtistName !== getValues("artistName")) {
  //   setIsNewArtist(false);
  //   setNewArtistName("");
  // }
  // if (isNewSong && newSongName !== getValues("songName")) {
  //   setIsNewSong(false);
  //   setNewSongName("");
  // }

  return (
    <Layout>
      <form action="" autoComplete="off">
        <div className="mb-5 rounded-lg bg-gray-900 p-5">
          <h1 className="mb-5 text-xl font-bold text-white">Artist</h1>
          {/* <label htmlFor="artist-name">Artist Name</label> */}
          <div className="relative">
            <input
              className="block w-full border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
              id="artist-name"
              type="text"
              placeholder="Artist Name"
              onClick={() => setArtistUlVisible(true)}
              {...register("artistName", {
                required: true,
                onChange: (e) => {
                  // setValue("artistName", e.target.value);
                  // setValue("artistId", "");

                  if (artistSet) {
                    setShowNewArtistForm(false);
                    setShowSongForm(false);
                    setShowNewSongForm(false);
                    setShowLyricsForm(false);
                    reset({
                      artistId: "",
                      artistName: getValues("artistName"),
                      bio: "",
                      artistCover: "",
                      songId: "",
                      songName: "",
                      altSongTitle: "",
                      videoLink: "",
                      songCover: "",
                      language: "",
                      lyrics: [
                        {
                          language: "",
                          content: "",
                        },
                      ],
                    });
                    setArtistSet(false);
                    setSongSet(false);
                  }
                },
              })}
            />
            {artistData && artistUlVisible && (
              <ul
                className={clsx("absolute w-full bg-gray-700")}
                ref={artistUlRef}
              >
                {artistData.map((artist) => (
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
                {artistData.some(
                  (artist) =>
                    artist.name.toLowerCase() ===
                    getValues("artistName").toLowerCase()
                ) ? null : (
                  <li
                    onClick={() => {
                      // make additional form visible
                      // setIsNewArtist(true);
                      // setNewArtistName(getValues("artistName"));
                      setValue("artistId", "");
                      setArtistSet(true);

                      setArtistUlVisible(false);
                      setShowSongForm(true);
                      setShowNewArtistForm(true);
                      // setShowNewSongForm(true);
                    }}
                    className="cursor-pointer p-2 px-3 hover:bg-gray-800"
                  >
                    {`Create new artist (${debouncedArtistName})`}
                  </li>
                )}
              </ul>
            )}
          </div>
          <input type="hidden" {...register("artistId")} />
          {
            // additional form for new artist
            showNewArtistForm && (
              <div className="bg-red-900">
                {/* <label htmlFor="bio">Artist Bio</label> */}
                <textarea
                  className="block w-full resize-none border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
                  cols={30}
                  rows={10}
                  placeholder="Artist Bio (Optional)"
                  id="bio"
                  {...register("bio")}
                ></textarea>
                <label
                  className="block text-sm text-gray-500"
                  htmlFor="artist-cover"
                >
                  Artist Cover Image (Optional)
                </label>
                <input
                  type="file"
                  id="artist-cover"
                  accept="image/png, image/jpeg"
                  {...register("artistCover")}
                />
              </div>
            )
          }
        </div>
        {
          // additional form for song
          showSongForm && (
            <div
              className="mb-5 rounded-lg bg-gray-900 p-5"
              // ref={() => {
              //   setNewSongName(getValues("songName"));
              // }}
            >
              <h1 className="mb-5 text-xl font-bold text-white">Song</h1>
              <div className="relative">
                <input
                  className="block w-full border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
                  id="song-title"
                  type="text"
                  placeholder="Song Title"
                  onClick={() => setSongUlVisible(true)}
                  {...register("songName", {
                    required: true,
                    onChange: (e) => {
                      // setValue("artistName", e.target.value);
                      // setValue("artistId", "");

                      if (songSet) {
                        setShowNewSongForm(false);
                        setShowLyricsForm(false);
                        reset({
                          artistId: getValues("artistId"),
                          artistName: getValues("artistName"),
                          bio: getValues("bio"),
                          artistCover: getValues("artistCover"),
                          songId: "",
                          songName: getValues("songName"),
                          altSongTitle: "",
                          videoLink: "",
                          songCover: "",
                          language: "",
                          lyrics: [
                            {
                              language: "",
                              content: "",
                            },
                          ],
                        });
                        setSongSet(false);
                      }
                    },
                  })}
                />
                {getValues("songName") &&
                  getValues("songName").length !== 0 &&
                  songUlVisible && (
                    <ul
                      className={clsx("absolute w-full bg-gray-700")}
                      ref={songUlRef}
                    >
                      {!isNewArtist &&
                        songListData?.map((song) => (
                          <li
                            onClick={() => {
                              setValue("songName", song.title);
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
                                  getValues("songName") === song.title,
                              }
                            )}
                          >
                            {song.title}
                          </li>
                        ))}
                      {!isNewArtist &&
                      songListData?.some(
                        (song) =>
                          song.title.toLowerCase() ===
                          getValues("songName").toLowerCase()
                      ) ? null : (
                        <li
                          onClick={() => {
                            // make additional form visible
                            // setIsNewSong(true);
                            // setNewSongName(getValues("songName"));
                            setSongUlVisible(false);
                            setValue("songId", "");

                            setShowNewSongForm(true);
                            setShowLyricsForm(true);
                            setSongSet(true);
                          }}
                          className="cursor-pointer p-2 px-3 hover:bg-gray-800"
                        >
                          {`Create new song (${debouncedSongName})`}
                        </li>
                      )}
                    </ul>
                  )}
              </div>
              <input type="hidden" {...register("songId")} />
              {
                // additional form for new song
                showNewSongForm && (
                  <div className="bg-red-900">
                    {/* <label htmlFor="alt-song-title">Alt Song Title</label> */}
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
                        onChange: (e: ChangeEvent<HTMLSelectElement>) => {
                          setValue("lyrics.0.language", e.target.value);
                        },
                      })}
                    >
                      <option value="ab">Abkhazian</option>
                      <option value="aa">Afar</option>
                      <option value="af">Afrikaans</option>
                      <option value="ak">Akan</option>
                      <option value="sq">Albanian</option>
                      <option value="am">Amharic</option>
                      <option value="ar">Arabic</option>
                      <option value="an">Aragonese</option>
                      <option value="hy">Armenian</option>
                      <option value="as">Assamese</option>
                      <option value="av">Avaric</option>
                      <option value="ae">Avestan</option>
                      <option value="ay">Aymara</option>
                      <option value="az">Azerbaijani</option>
                      <option value="bm">Bambara</option>
                      <option value="ba">Bashkir</option>
                      <option value="eu">Basque</option>
                      <option value="be">Belarusian</option>
                      <option value="bn">Bengali</option>
                      <option value="bi">Bislama</option>
                      <option value="bs">Bosnian</option>
                      <option value="br">Breton</option>
                      <option value="bg">Bulgarian</option>
                      <option value="my">Burmese</option>
                      <option value="ca">Catalan, Valencian</option>
                      <option value="ch">Chamorro</option>
                      <option value="ce">Chechen</option>
                      <option value="ny">Chichewa, Chewa, Nyanja</option>
                      <option value="zh">Chinese</option>
                      <option value="cu">
                        Church Slavonic, Old Slavonic, Old Church Slavonic
                      </option>
                      <option value="cv">Chuvash</option>
                      <option value="kw">Cornish</option>
                      <option value="co">Corsican</option>
                      <option value="cr">Cree</option>
                      <option value="hr">Croatian</option>
                      <option value="cs">Czech</option>
                      <option value="da">Danish</option>
                      <option value="dv">Divehi, Dhivehi, Maldivian</option>
                      <option value="nl">Dutch, Flemish</option>
                      <option value="dz">Dzongkha</option>
                      <option value="en">English</option>
                      <option value="eo">Esperanto</option>
                      <option value="et">Estonian</option>
                      <option value="ee">Ewe</option>
                      <option value="fo">Faroese</option>
                      <option value="fj">Fijian</option>
                      <option value="fi">Finnish</option>
                      <option value="fr">French</option>
                      <option value="fy">Western Frisian</option>
                      <option value="ff">Fulah</option>
                      <option value="gd">Gaelic, Scottish Gaelic</option>
                      <option value="gl">Galician</option>
                      <option value="lg">Ganda</option>
                      <option value="ka">Georgian</option>
                      <option value="de">German</option>
                      <option value="el">Greek, Modern (1453-)</option>
                      <option value="kl">Kalaallisut, Greenlandic</option>
                      <option value="gn">Guarani</option>
                      <option value="gu">Gujarati</option>
                      <option value="ht">Haitian, Haitian Creole</option>
                      <option value="ha">Hausa</option>
                      <option value="he">Hebrew</option>
                      <option value="hz">Herero</option>
                      <option value="hi">Hindi</option>
                      <option value="ho">Hiri Motu</option>
                      <option value="hu">Hungarian</option>
                      <option value="is">Icelandic</option>
                      <option value="io">Ido</option>
                      <option value="ig">Igbo</option>
                      <option value="id">Indonesian</option>
                      <option value="ia">
                        Interlingua (International Auxiliary Language
                        Association)
                      </option>
                      <option value="ie">Interlingue, Occidental</option>
                      <option value="iu">Inuktitut</option>
                      <option value="ik">Inupiaq</option>
                      <option value="ga">Irish</option>
                      <option value="it">Italian</option>
                      <option value="ja">Japanese</option>
                      <option value="jv">Javanese</option>
                      <option value="kn">Kannada</option>
                      <option value="kr">Kanuri</option>
                      <option value="ks">Kashmiri</option>
                      <option value="kk">Kazakh</option>
                      <option value="km">Central Khmer</option>
                      <option value="ki">Kikuyu, Gikuyu</option>
                      <option value="rw">Kinyarwanda</option>
                      <option value="ky">Kirghiz, Kyrgyz</option>
                      <option value="kv">Komi</option>
                      <option value="kg">Kongo</option>
                      <option value="ko">Korean</option>
                      <option value="kj">Kuanyama, Kwanyama</option>
                      <option value="ku">Kurdish</option>
                      <option value="lo">Lao</option>
                      <option value="la">Latin</option>
                      <option value="lv">Latvian</option>
                      <option value="li">
                        Limburgan, Limburger, Limburgish
                      </option>
                      <option value="ln">Lingala</option>
                      <option value="lt">Lithuanian</option>
                      <option value="lu">Luba-Katanga</option>
                      <option value="lb">Luxembourgish, Letzeburgesch</option>
                      <option value="mk">Macedonian</option>
                      <option value="mg">Malagasy</option>
                      <option value="ms">Malay</option>
                      <option value="ml">Malayalam</option>
                      <option value="mt">Maltese</option>
                      <option value="gv">Manx</option>
                      <option value="mi">Maori</option>
                      <option value="mr">Marathi</option>
                      <option value="mh">Marshallese</option>
                      <option value="mn">Mongolian</option>
                      <option value="na">Nauru</option>
                      <option value="nv">Navajo, Navaho</option>
                      <option value="nd">North Ndebele</option>
                      <option value="nr">South Ndebele</option>
                      <option value="ng">Ndonga</option>
                      <option value="ne">Nepali</option>
                      <option value="no">Norwegian</option>
                      <option value="nb">Norwegian Bokmål</option>
                      <option value="nn">Norwegian Nynorsk</option>
                      <option value="ii">Sichuan Yi, Nuosu</option>
                      <option value="oc">Occitan</option>
                      <option value="oj">Ojibwa</option>
                      <option value="or">Oriya</option>
                      <option value="om">Oromo</option>
                      <option value="os">Ossetian, Ossetic</option>
                      <option value="pi">Pali</option>
                      <option value="ps">Pashto, Pushto</option>
                      <option value="fa">Persian</option>
                      <option value="pl">Polish</option>
                      <option value="pt">Portuguese</option>
                      <option value="pa">Punjabi, Panjabi</option>
                      <option value="qu">Quechua</option>
                      <option value="ro">Romanian, Moldavian, Moldovan</option>
                      <option value="rm">Romansh</option>
                      <option value="rn">Rundi</option>
                      <option value="ru">Russian</option>
                      <option value="se">Northern Sami</option>
                      <option value="sm">Samoan</option>
                      <option value="sg">Sango</option>
                      <option value="sa">Sanskrit</option>
                      <option value="sc">Sardinian</option>
                      <option value="sr">Serbian</option>
                      <option value="sn">Shona</option>
                      <option value="sd">Sindhi</option>
                      <option value="si">Sinhala, Sinhalese</option>
                      <option value="sk">Slovak</option>
                      <option value="sl">Slovenian</option>
                      <option value="so">Somali</option>
                      <option value="st">Southern Sotho</option>
                      <option value="es">Spanish, Castilian</option>
                      <option value="su">Sundanese</option>
                      <option value="sw">Swahili</option>
                      <option value="ss">Swati</option>
                      <option value="sv">Swedish</option>
                      <option value="tl">Tagalog</option>
                      <option value="ty">Tahitian</option>
                      <option value="tg">Tajik</option>
                      <option value="ta">Tamil</option>
                      <option value="tt">Tatar</option>
                      <option value="te">Telugu</option>
                      <option value="th">Thai</option>
                      <option value="bo">Tibetan</option>
                      <option value="ti">Tigrinya</option>
                      <option value="to">Tonga (Tonga Islands)</option>
                      <option value="ts">Tsonga</option>
                      <option value="tn">Tswana</option>
                      <option value="tr">Turkish</option>
                      <option value="tk">Turkmen</option>
                      <option value="tw">Twi</option>
                      <option value="ug">Uighur, Uyghur</option>
                      <option value="uk">Ukrainian</option>
                      <option value="ur">Urdu</option>
                      <option value="uz">Uzbek</option>
                      <option value="ve">Venda</option>
                      <option value="vi">Vietnamese</option>
                      <option value="vo">Volapük</option>
                      <option value="wa">Walloon</option>
                      <option value="cy">Welsh</option>
                      <option value="wo">Wolof</option>
                      <option value="xh">Xhosa</option>
                      <option value="yi">Yiddish</option>
                      <option value="yo">Yoruba</option>
                      <option value="za">Zhuang, Chuang</option>
                      <option value="zu">Zulu</option>
                    </select>
                    {/* <label htmlFor="video-link">Video Link</label> */}
                    <input
                      className="block w-full border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
                      id="video-link"
                      type="text"
                      placeholder="Video Link"
                      {...register("videoLink", { required: true })}
                    />
                    <label
                      className="block text-sm text-gray-500"
                      htmlFor="song-cover"
                    >
                      Song Cover Image (Optional)
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      {...register("songCover", { required: true })}
                    />
                  </div>
                )
              }
            </div>
          )
        }
        {showLyricsForm && (
          <div className="mb-5 rounded-lg bg-gray-900 p-5">
            <h1 className="mb-5 text-xl font-bold text-white">Lyrics</h1>
            <button
              className="rounder-lg mb-5 bg-gray-800 py-2 px-3"
              type="button"
              onClick={() => {
                append({ language: "", content: "" });
              }}
            >
              Add language
            </button>
            <div className="flex">
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
                  <option value="ab">Abkhazian</option>
                  <option value="aa">Afar</option>
                  <option value="af">Afrikaans</option>
                  <option value="ak">Akan</option>
                  <option value="sq">Albanian</option>
                  <option value="am">Amharic</option>
                  <option value="ar">Arabic</option>
                  <option value="an">Aragonese</option>
                  <option value="hy">Armenian</option>
                  <option value="as">Assamese</option>
                  <option value="av">Avaric</option>
                  <option value="ae">Avestan</option>
                  <option value="ay">Aymara</option>
                  <option value="az">Azerbaijani</option>
                  <option value="bm">Bambara</option>
                  <option value="ba">Bashkir</option>
                  <option value="eu">Basque</option>
                  <option value="be">Belarusian</option>
                  <option value="bn">Bengali</option>
                  <option value="bi">Bislama</option>
                  <option value="bs">Bosnian</option>
                  <option value="br">Breton</option>
                  <option value="bg">Bulgarian</option>
                  <option value="my">Burmese</option>
                  <option value="ca">Catalan, Valencian</option>
                  <option value="ch">Chamorro</option>
                  <option value="ce">Chechen</option>
                  <option value="ny">Chichewa, Chewa, Nyanja</option>
                  <option value="zh">Chinese</option>
                  <option value="cu">
                    Church Slavonic, Old Slavonic, Old Church Slavonic
                  </option>
                  <option value="cv">Chuvash</option>
                  <option value="kw">Cornish</option>
                  <option value="co">Corsican</option>
                  <option value="cr">Cree</option>
                  <option value="hr">Croatian</option>
                  <option value="cs">Czech</option>
                  <option value="da">Danish</option>
                  <option value="dv">Divehi, Dhivehi, Maldivian</option>
                  <option value="nl">Dutch, Flemish</option>
                  <option value="dz">Dzongkha</option>
                  <option value="en">English</option>
                  <option value="eo">Esperanto</option>
                  <option value="et">Estonian</option>
                  <option value="ee">Ewe</option>
                  <option value="fo">Faroese</option>
                  <option value="fj">Fijian</option>
                  <option value="fi">Finnish</option>
                  <option value="fr">French</option>
                  <option value="fy">Western Frisian</option>
                  <option value="ff">Fulah</option>
                  <option value="gd">Gaelic, Scottish Gaelic</option>
                  <option value="gl">Galician</option>
                  <option value="lg">Ganda</option>
                  <option value="ka">Georgian</option>
                  <option value="de">German</option>
                  <option value="el">Greek, Modern (1453-)</option>
                  <option value="kl">Kalaallisut, Greenlandic</option>
                  <option value="gn">Guarani</option>
                  <option value="gu">Gujarati</option>
                  <option value="ht">Haitian, Haitian Creole</option>
                  <option value="ha">Hausa</option>
                  <option value="he">Hebrew</option>
                  <option value="hz">Herero</option>
                  <option value="hi">Hindi</option>
                  <option value="ho">Hiri Motu</option>
                  <option value="hu">Hungarian</option>
                  <option value="is">Icelandic</option>
                  <option value="io">Ido</option>
                  <option value="ig">Igbo</option>
                  <option value="id">Indonesian</option>
                  <option value="ia">
                    Interlingua (International Auxiliary Language Association)
                  </option>
                  <option value="ie">Interlingue, Occidental</option>
                  <option value="iu">Inuktitut</option>
                  <option value="ik">Inupiaq</option>
                  <option value="ga">Irish</option>
                  <option value="it">Italian</option>
                  <option value="ja">Japanese</option>
                  <option value="jv">Javanese</option>
                  <option value="kn">Kannada</option>
                  <option value="kr">Kanuri</option>
                  <option value="ks">Kashmiri</option>
                  <option value="kk">Kazakh</option>
                  <option value="km">Central Khmer</option>
                  <option value="ki">Kikuyu, Gikuyu</option>
                  <option value="rw">Kinyarwanda</option>
                  <option value="ky">Kirghiz, Kyrgyz</option>
                  <option value="kv">Komi</option>
                  <option value="kg">Kongo</option>
                  <option value="ko">Korean</option>
                  <option value="kj">Kuanyama, Kwanyama</option>
                  <option value="ku">Kurdish</option>
                  <option value="lo">Lao</option>
                  <option value="la">Latin</option>
                  <option value="lv">Latvian</option>
                  <option value="li">Limburgan, Limburger, Limburgish</option>
                  <option value="ln">Lingala</option>
                  <option value="lt">Lithuanian</option>
                  <option value="lu">Luba-Katanga</option>
                  <option value="lb">Luxembourgish, Letzeburgesch</option>
                  <option value="mk">Macedonian</option>
                  <option value="mg">Malagasy</option>
                  <option value="ms">Malay</option>
                  <option value="ml">Malayalam</option>
                  <option value="mt">Maltese</option>
                  <option value="gv">Manx</option>
                  <option value="mi">Maori</option>
                  <option value="mr">Marathi</option>
                  <option value="mh">Marshallese</option>
                  <option value="mn">Mongolian</option>
                  <option value="na">Nauru</option>
                  <option value="nv">Navajo, Navaho</option>
                  <option value="nd">North Ndebele</option>
                  <option value="nr">South Ndebele</option>
                  <option value="ng">Ndonga</option>
                  <option value="ne">Nepali</option>
                  <option value="no">Norwegian</option>
                  <option value="nb">Norwegian Bokmål</option>
                  <option value="nn">Norwegian Nynorsk</option>
                  <option value="ii">Sichuan Yi, Nuosu</option>
                  <option value="oc">Occitan</option>
                  <option value="oj">Ojibwa</option>
                  <option value="or">Oriya</option>
                  <option value="om">Oromo</option>
                  <option value="os">Ossetian, Ossetic</option>
                  <option value="pi">Pali</option>
                  <option value="ps">Pashto, Pushto</option>
                  <option value="fa">Persian</option>
                  <option value="pl">Polish</option>
                  <option value="pt">Portuguese</option>
                  <option value="pa">Punjabi, Panjabi</option>
                  <option value="qu">Quechua</option>
                  <option value="ro">Romanian, Moldavian, Moldovan</option>
                  <option value="rm">Romansh</option>
                  <option value="rn">Rundi</option>
                  <option value="ru">Russian</option>
                  <option value="se">Northern Sami</option>
                  <option value="sm">Samoan</option>
                  <option value="sg">Sango</option>
                  <option value="sa">Sanskrit</option>
                  <option value="sc">Sardinian</option>
                  <option value="sr">Serbian</option>
                  <option value="sn">Shona</option>
                  <option value="sd">Sindhi</option>
                  <option value="si">Sinhala, Sinhalese</option>
                  <option value="sk">Slovak</option>
                  <option value="sl">Slovenian</option>
                  <option value="so">Somali</option>
                  <option value="st">Southern Sotho</option>
                  <option value="es">Spanish, Castilian</option>
                  <option value="su">Sundanese</option>
                  <option value="sw">Swahili</option>
                  <option value="ss">Swati</option>
                  <option value="sv">Swedish</option>
                  <option value="tl">Tagalog</option>
                  <option value="ty">Tahitian</option>
                  <option value="tg">Tajik</option>
                  <option value="ta">Tamil</option>
                  <option value="tt">Tatar</option>
                  <option value="te">Telugu</option>
                  <option value="th">Thai</option>
                  <option value="bo">Tibetan</option>
                  <option value="ti">Tigrinya</option>
                  <option value="to">Tonga (Tonga Islands)</option>
                  <option value="ts">Tsonga</option>
                  <option value="tn">Tswana</option>
                  <option value="tr">Turkish</option>
                  <option value="tk">Turkmen</option>
                  <option value="tw">Twi</option>
                  <option value="ug">Uighur, Uyghur</option>
                  <option value="uk">Ukrainian</option>
                  <option value="ur">Urdu</option>
                  <option value="uz">Uzbek</option>
                  <option value="ve">Venda</option>
                  <option value="vi">Vietnamese</option>
                  <option value="vo">Volapük</option>
                  <option value="wa">Walloon</option>
                  <option value="cy">Welsh</option>
                  <option value="wo">Wolof</option>
                  <option value="xh">Xhosa</option>
                  <option value="yi">Yiddish</option>
                  <option value="yo">Yoruba</option>
                  <option value="za">Zhuang, Chuang</option>
                  <option value="zu">Zulu</option>
                </select>
                {/* <label htmlFor="lyric">Lyric</label> */}
                <textarea
                  className="block w-full resize-none border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
                  cols={30}
                  rows={10}
                  placeholder="Add lyric here"
                  {...register(`lyrics.0.content` as const, {
                    required: true,
                  })}
                ></textarea>
                {/* <label htmlFor="timestamp">Timestamp</label> */}
                <input
                  hidden
                  id="timestamp"
                  type="text"
                  placeholder="Timestamp"
                />
              </div>
              {fields.map((item, index) => {
                if (index > 0) {
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
                        <option value="ab">Abkhazian</option>
                        <option value="aa">Afar</option>
                        <option value="af">Afrikaans</option>
                        <option value="ak">Akan</option>
                        <option value="sq">Albanian</option>
                        <option value="am">Amharic</option>
                        <option value="ar">Arabic</option>
                        <option value="an">Aragonese</option>
                        <option value="hy">Armenian</option>
                        <option value="as">Assamese</option>
                        <option value="av">Avaric</option>
                        <option value="ae">Avestan</option>
                        <option value="ay">Aymara</option>
                        <option value="az">Azerbaijani</option>
                        <option value="bm">Bambara</option>
                        <option value="ba">Bashkir</option>
                        <option value="eu">Basque</option>
                        <option value="be">Belarusian</option>
                        <option value="bn">Bengali</option>
                        <option value="bi">Bislama</option>
                        <option value="bs">Bosnian</option>
                        <option value="br">Breton</option>
                        <option value="bg">Bulgarian</option>
                        <option value="my">Burmese</option>
                        <option value="ca">Catalan, Valencian</option>
                        <option value="ch">Chamorro</option>
                        <option value="ce">Chechen</option>
                        <option value="ny">Chichewa, Chewa, Nyanja</option>
                        <option value="zh">Chinese</option>
                        <option value="cu">
                          Church Slavonic, Old Slavonic, Old Church Slavonic
                        </option>
                        <option value="cv">Chuvash</option>
                        <option value="kw">Cornish</option>
                        <option value="co">Corsican</option>
                        <option value="cr">Cree</option>
                        <option value="hr">Croatian</option>
                        <option value="cs">Czech</option>
                        <option value="da">Danish</option>
                        <option value="dv">Divehi, Dhivehi, Maldivian</option>
                        <option value="nl">Dutch, Flemish</option>
                        <option value="dz">Dzongkha</option>
                        <option value="en">English</option>
                        <option value="eo">Esperanto</option>
                        <option value="et">Estonian</option>
                        <option value="ee">Ewe</option>
                        <option value="fo">Faroese</option>
                        <option value="fj">Fijian</option>
                        <option value="fi">Finnish</option>
                        <option value="fr">French</option>
                        <option value="fy">Western Frisian</option>
                        <option value="ff">Fulah</option>
                        <option value="gd">Gaelic, Scottish Gaelic</option>
                        <option value="gl">Galician</option>
                        <option value="lg">Ganda</option>
                        <option value="ka">Georgian</option>
                        <option value="de">German</option>
                        <option value="el">Greek, Modern (1453-)</option>
                        <option value="kl">Kalaallisut, Greenlandic</option>
                        <option value="gn">Guarani</option>
                        <option value="gu">Gujarati</option>
                        <option value="ht">Haitian, Haitian Creole</option>
                        <option value="ha">Hausa</option>
                        <option value="he">Hebrew</option>
                        <option value="hz">Herero</option>
                        <option value="hi">Hindi</option>
                        <option value="ho">Hiri Motu</option>
                        <option value="hu">Hungarian</option>
                        <option value="is">Icelandic</option>
                        <option value="io">Ido</option>
                        <option value="ig">Igbo</option>
                        <option value="id">Indonesian</option>
                        <option value="ia">
                          Interlingua (International Auxiliary Language
                          Association)
                        </option>
                        <option value="ie">Interlingue, Occidental</option>
                        <option value="iu">Inuktitut</option>
                        <option value="ik">Inupiaq</option>
                        <option value="ga">Irish</option>
                        <option value="it">Italian</option>
                        <option value="ja">Japanese</option>
                        <option value="jv">Javanese</option>
                        <option value="kn">Kannada</option>
                        <option value="kr">Kanuri</option>
                        <option value="ks">Kashmiri</option>
                        <option value="kk">Kazakh</option>
                        <option value="km">Central Khmer</option>
                        <option value="ki">Kikuyu, Gikuyu</option>
                        <option value="rw">Kinyarwanda</option>
                        <option value="ky">Kirghiz, Kyrgyz</option>
                        <option value="kv">Komi</option>
                        <option value="kg">Kongo</option>
                        <option value="ko">Korean</option>
                        <option value="kj">Kuanyama, Kwanyama</option>
                        <option value="ku">Kurdish</option>
                        <option value="lo">Lao</option>
                        <option value="la">Latin</option>
                        <option value="lv">Latvian</option>
                        <option value="li">
                          Limburgan, Limburger, Limburgish
                        </option>
                        <option value="ln">Lingala</option>
                        <option value="lt">Lithuanian</option>
                        <option value="lu">Luba-Katanga</option>
                        <option value="lb">Luxembourgish, Letzeburgesch</option>
                        <option value="mk">Macedonian</option>
                        <option value="mg">Malagasy</option>
                        <option value="ms">Malay</option>
                        <option value="ml">Malayalam</option>
                        <option value="mt">Maltese</option>
                        <option value="gv">Manx</option>
                        <option value="mi">Maori</option>
                        <option value="mr">Marathi</option>
                        <option value="mh">Marshallese</option>
                        <option value="mn">Mongolian</option>
                        <option value="na">Nauru</option>
                        <option value="nv">Navajo, Navaho</option>
                        <option value="nd">North Ndebele</option>
                        <option value="nr">South Ndebele</option>
                        <option value="ng">Ndonga</option>
                        <option value="ne">Nepali</option>
                        <option value="no">Norwegian</option>
                        <option value="nb">Norwegian Bokmål</option>
                        <option value="nn">Norwegian Nynorsk</option>
                        <option value="ii">Sichuan Yi, Nuosu</option>
                        <option value="oc">Occitan</option>
                        <option value="oj">Ojibwa</option>
                        <option value="or">Oriya</option>
                        <option value="om">Oromo</option>
                        <option value="os">Ossetian, Ossetic</option>
                        <option value="pi">Pali</option>
                        <option value="ps">Pashto, Pushto</option>
                        <option value="fa">Persian</option>
                        <option value="pl">Polish</option>
                        <option value="pt">Portuguese</option>
                        <option value="pa">Punjabi, Panjabi</option>
                        <option value="qu">Quechua</option>
                        <option value="ro">
                          Romanian, Moldavian, Moldovan
                        </option>
                        <option value="rm">Romansh</option>
                        <option value="rn">Rundi</option>
                        <option value="ru">Russian</option>
                        <option value="se">Northern Sami</option>
                        <option value="sm">Samoan</option>
                        <option value="sg">Sango</option>
                        <option value="sa">Sanskrit</option>
                        <option value="sc">Sardinian</option>
                        <option value="sr">Serbian</option>
                        <option value="sn">Shona</option>
                        <option value="sd">Sindhi</option>
                        <option value="si">Sinhala, Sinhalese</option>
                        <option value="sk">Slovak</option>
                        <option value="sl">Slovenian</option>
                        <option value="so">Somali</option>
                        <option value="st">Southern Sotho</option>
                        <option value="es">Spanish, Castilian</option>
                        <option value="su">Sundanese</option>
                        <option value="sw">Swahili</option>
                        <option value="ss">Swati</option>
                        <option value="sv">Swedish</option>
                        <option value="tl">Tagalog</option>
                        <option value="ty">Tahitian</option>
                        <option value="tg">Tajik</option>
                        <option value="ta">Tamil</option>
                        <option value="tt">Tatar</option>
                        <option value="te">Telugu</option>
                        <option value="th">Thai</option>
                        <option value="bo">Tibetan</option>
                        <option value="ti">Tigrinya</option>
                        <option value="to">Tonga (Tonga Islands)</option>
                        <option value="ts">Tsonga</option>
                        <option value="tn">Tswana</option>
                        <option value="tr">Turkish</option>
                        <option value="tk">Turkmen</option>
                        <option value="tw">Twi</option>
                        <option value="ug">Uighur, Uyghur</option>
                        <option value="uk">Ukrainian</option>
                        <option value="ur">Urdu</option>
                        <option value="uz">Uzbek</option>
                        <option value="ve">Venda</option>
                        <option value="vi">Vietnamese</option>
                        <option value="vo">Volapük</option>
                        <option value="wa">Walloon</option>
                        <option value="cy">Welsh</option>
                        <option value="wo">Wolof</option>
                        <option value="xh">Xhosa</option>
                        <option value="yi">Yiddish</option>
                        <option value="yo">Yoruba</option>
                        <option value="za">Zhuang, Chuang</option>
                        <option value="zu">Zulu</option>
                      </select>
                      {/* <label htmlFor="lyric">Lyric</label> */}
                      <textarea
                        className="block w-full resize-none border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
                        cols={30}
                        rows={10}
                        placeholder="Add lyric here"
                        {...register(`lyrics.${index}.content` as const, {
                          required: true,
                        })}
                      ></textarea>
                      {/* <label htmlFor="timestamp">Timestamp</label> */}
                      <input
                        hidden
                        id="timestamp"
                        type="text"
                        placeholder="Timestamp"
                      />
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
        )}
      </form>
    </Layout>
  );
};
export default Submit;
