import clsx from "clsx";
import { type NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import { useComponentVisible, useDebouncedValue } from "~/utils/hooks";

// form data types exluding debounced values
type FormData = {
  artistName: string;
};

const Submit: NextPage = () => {
  const { register, setValue, watch, getValues } = useForm<FormData>();
  const {
    ref: ulRef,
    isComponentVisible: ulVisible,
    setIsComponentVisible: setUlVisible,
  } = useComponentVisible(true);
  const [debouncedArtistName] = useDebouncedValue(
    getValues("artistName"),
    1000,
    { leading: true }
  );
  const { data: artistData, isLoading } =
    api.artist.getListByName.useQuery(debouncedArtistName);
  console.log(watch("artistName"), debouncedArtistName);
  return (
    <Layout>
      <form action="" autoComplete="off">
        <div className="mb-5 rounded-lg bg-gray-900 p-5">
          <h1 className="mb-5 text-xl font-bold text-white">Artist</h1>
          {/* <label htmlFor="artist-name">Artist Name</label> */}
          <div className="flex items-start gap-5">
            <div className="relative grow">
              <input
                className="block w-full border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
                id="artist-name"
                type="text"
                placeholder="Artist Name"
                onClick={() => setUlVisible(true)}
                {...register("artistName")}
              />
              {artistData && ulVisible && (
                <ul className={clsx("absolute w-full bg-gray-700")} ref={ulRef}>
                  {artistData.map((artist) => (
                    <li
                      onClick={() => {
                        setValue("artistName", artist.name);
                        setUlVisible(false);
                      }}
                      key={artist.id}
                      className={clsx(
                        "cursor-pointer p-2 px-3 hover:bg-gray-800",
                        {
                          "bg-gray-600":
                            getValues("artistName") === artist.name,
                        }
                      )}
                    >
                      {artist.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button className="mt-2 rounded-3xl bg-white px-3 py-2 font-medium text-black">
              Check
            </button>
          </div>
          <div>
            {/* <label htmlFor="new-artist-name">New Artist Name</label> */}
            <input
              className="block w-full border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
              id="new-artist-name"
              type="text"
              placeholder="New Artist Name"
            />
            {/* <label htmlFor="bio">Artist Bio</label> */}
            <textarea
              className="block w-full resize-none border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
              name="bio"
              id="bio"
              cols={30}
              rows={10}
              placeholder="Artist Bio"
            ></textarea>
            <label
              className="block text-sm text-gray-500"
              htmlFor="artist-cover"
            >
              Artist Cover Image
            </label>
            <input
              type="file"
              id="artist-cover"
              name="artist-cover"
              accept="image/png, image/jpeg"
            />
          </div>
        </div>
        <div className="mb-5 rounded-lg bg-gray-900 p-5">
          <h1 className="mb-5 text-xl font-bold text-white">Song</h1>
          <input
            className="block w-full border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
            id="song-title"
            type="text"
            placeholder="Song Title"
          />
        </div>
        <div className="mb-5 rounded-lg bg-gray-900 p-5">
          <h1 className="mb-5 text-xl font-bold text-white">New Song</h1>
          {/* <label htmlFor="song-title">Song Title</label> */}
          <input
            className="block w-full border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
            id="song-title"
            type="text"
            placeholder="Song Title"
          />
          {/* <label htmlFor="alt-song-title">Alt Song Title</label> */}
          <input
            className="block w-full border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
            id="alt-song-title"
            type="text"
            placeholder="Alt Song Title"
          />
          <label
            className="block text-sm text-gray-500"
            htmlFor="language-select"
          >
            Song Language
          </label>
          <select className="bg-gray-800" name="language" id="language-select">
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
          {/* <label htmlFor="video-link">Video Link</label> */}
          <input
            className="block w-full border-b border-gray-500 bg-transparent p-3 transition-colors focus:border-blue-300 focus:outline-none"
            id="video-link"
            type="text"
            placeholder="Video Link"
          />
          <label className="block text-sm text-gray-500" htmlFor="song-cover">
            Song Cover Image
          </label>
          <input
            type="file"
            id="song-cover"
            name="song-cover"
            accept="image/png, image/jpeg"
          />
        </div>
        <div className="mb-5 rounded-lg bg-gray-900 p-5">
          <h1 className="mb-5 text-xl font-bold text-white">Lyrics</h1>
          <button
            className="rounder-lg mb-5 bg-gray-800 py-2 px-3"
            type="button"
          >
            Add language
          </button>
          <label
            className="block text-sm text-gray-500"
            htmlFor="lyric-language-select"
          >
            Lyric Language
          </label>
          <select
            className="bg-gray-800"
            name="language"
            id="lyric-language-select"
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
            name="lyric"
            id="lyric"
            cols={30}
            rows={10}
          ></textarea>
          {/* <label htmlFor="timestamp">Timestamp</label> */}
          <input hidden id="timestamp" type="text" placeholder="Timestamp" />
        </div>
      </form>
    </Layout>
  );
};
export default Submit;
