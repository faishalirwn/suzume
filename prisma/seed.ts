import { type Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const artistData: Prisma.ArtistCreateInput[] = [
  {
    name: "Vaundy",
    bio: 'Vaundy is a Japanese musician. He started his career in 2019 by independently uploading online, before breaking out late in the year with the song "Tokyo Flash". He has released songs for multiple TV shows, including "Chainsaw Blood" for Chainsaw Man and "Hadaka no Yuusha" for Ranking of Kings. From Wikipedia (https://en.wikipedia.org/wiki/Vaundy) under Creative Commons Attribution CC-BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/legalcode)',
    cover:
      "https://lh3.googleusercontent.com/Ffj8Fk2_IKSx9oZw2jxIbdvGAHlroSB_JYmH0euuMc_jQ3nyjr6uctQ1DzMqiVyMriWgaYUK-43ZdNc=w540-h225-p-l90-rj",
    songs: {
      create: [
        {
          title: "Fukakouryoku",
          cover:
            "https://www.lyrical-nonsense.com/wp-content/uploads/2019/11/Vaundy-Fukakouryoku-2.jpg",
          releaseDate: new Date("2019-11-09"),
          language: "JA",
          altTitle: "不可幸力",
          lyricist: "Vaundy",
          composer: "Vaundy",
          lyrics: {
            create: [
              {
                content: "Doko ni ittemo Ikizumari soshite iki douri wo",
                language: "JA_RO",
              },
              {
                content: "No matter where you go",
                language: "EN",
              },
            ],
          },
        },
        {
          title: "odoriko",
          cover:
            "https://www.lyrical-nonsense.com/wp-content/uploads/2021/11/Vaundy-odoriko.jpg",
          releaseDate: new Date("2021-11-17"),
          language: "JA",
          altTitle: "踊り子",
          lyricist: "Vaundy",
          composer: "Vaundy",
          lyrics: {
            create: [
              {
                content: "Nee, dokka ni oite kita you na",
                language: "JA_RO",
              },
            ],
          },
        },
        {
          title: "Shiwaawase",
          cover:
            "https://www.lyrical-nonsense.com/wp-content/uploads/2020/12/Vaundy-SHIAAWASE.jpg",
          releaseDate: new Date("2021-04-11"),
          language: "JA",
          altTitle: "しわあわせ",
          lyricist: "Vaundy",
          composer: "Vaundy",
          lyrics: {
            create: [
              {
                content: "Boku no jika sougaku yonhyakuen no shinzou to",
                language: "JA_RO",
              },
              {
                content: "400 yen",
                language: "EN",
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "Eve",
    bio: `Eve is a singer-songwriter and Vocaloid producer. He got his start in the Music Industry by doing covers on Nico Nico Douga.
    He eventually signed to Toy's Factory in 2019, moving away from Harapeco Records. He was also a guest in "School of Lock!" by Tokyo FM.
    His music has been featured in the anime Dororo, Jujutsu Kaisen and Josee, the Tiger and the Fish.
    
    From Wikipedia (https://en.wikipedia.org/wiki/Eve_(Japanese_singer)) under Creative Commons Attribution CC-BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/legalcode)`,
    cover:
      "https://lh3.googleusercontent.com/1BFQt988LS_GupMk7K8412eq4Pa4A_vD5DD8wPqzNSqvwuFTRrXJ87XukcxTUrKAbMeE6M6MHXA_3Q=w540-h225-p-l90-rj",
    songs: {
      create: [
        {
          title: "Last Dance",
          cover:
            "https://www.lyrical-nonsense.com/wp-content/uploads/Eve-Otogi-1.jpg",
          releaseDate: new Date("2019-02-06"),
          language: "JA",
          altTitle: "ラストダンス",
          lyricist: "Eve",
          composer: "Eve",
          lyrics: {
            create: [
              {
                content:
                  "ここに蔓延る摩天楼\n 君の確かな芽を摘んできた\n \n 叶えたいもの全て奪い攫っては\n 僕をねじ曲げてく\n \n 価値観違い 嫌いなあいつは\n 滑稽なんて嗤いあって\n 上品な言葉 乗せあって待って焦って足掻いた\n せっせ 知恵を絞って せっせ 欲をかいて\n エゴに堕ちてゆけ\n \n あなたは言った 消耗品さ\n だけど私は まだ考えてるわ\n いつかまた こうやって\n 踊ってやってくれないか\n \n 辛気を纏った 少年少女\n 憂さを晴らした イエスマン患者\n 誰も何者でもないもの\n 真意を知れば最期になるならさ\n 舌が乾くまで話そうぜ\n \n 虚勢を張って 自分を失った\n 虚言を吐いて 幻になった\n \n 馬鹿になって 宙を舞って\n したらもう 壊れてしまいました\n \n 純粋で透明な少年のさ\n 感情に魔を差してやってんのさ\n \n 思い出して思い出して考えては\n 辿り着きさえもしないや\n \n あなたが言った 本当の意を\n 世界の片隅で考えてるわ\n \n 冷えきった 嘘さえも\n 溶かしてやってくれるのなら\n \n 孤独を知った才能人と\n 明日を選んだ メランコリー患者\n \n 戻れない僕にさようなら\n 指を加えて 泣いても無駄だから\n いつかまた\n \n 最終列車を待つわ\n あなたの帰りはないけど\n ここに居るべきではないこと\n 今全てを飲みこめやしないけど\n \n 遠くからみたら あなた幸せそうねでも\n 痛くて 痛くて 全部知ってるから\n \n あなたは言った 消耗品さ\n だけど私は まだ考えてるわ\n いつかまた こうやって\n 踊ってやってくれないか\n \n 辛気を纏った 少年少女\n 憂さを晴らした イエスマン患者\n 誰も何者でもないもの\n 真意を知れば最期になるならさ\n 舌が乾くまで話そうぜ\n \n そして僕ら逸話になって\n 今不確かな笑みを浮かべては\n 誰も知らなかった物語を今\n 君に話すから\n",
                language: "JA",
              },
              {
                content:
                  "Koko ni habikoru matenrou\n Kimi no tashika na me wo tsunde kita\n \n Kanaeta imo no subete ubaisaratte wa\n Boku wo nejimageteku\n \n Kachikan chigai kirai na aitsu wa\n Kokkei nante warai atte\n Jouhin na kotoba nose atte matte asette agaita\n Sesse chie wo shibotte sesse yoku wo kaite\n Ego ni ochite yuke\n \n Anata wa itta shoumouhin sa\n Dakedo watashi wa mada kangaeteru wa\n Itsuka mata kou yatte\n Odotte yatte kurenai ka\n \n Shinki wo matotta shounen shoujo\n Usa wo harashita iesu man kanja\n Daremo nanimono demo nai mono\n Shini wo shireba saigo ni naru nara sa\n Shita ga kawaku made hanasou ze\n \n Kyosei wo hatte jibun wo ushinatta\n Kyogen wo haite maboroshi ni natta\n \n Baka ni natte chuu wo matte\n Shitara mou kowarete shimaimashita\n \n Junsui de toumei na shounen no sa\n Kanjou ni ma wo sashite yatten no sa\n \n Omoidashite omoidashite kangaete wa\n Tadoritsuki sae mo shinai ya\n \n Anata ga itta hontou no i wo\n Sekai no katasumi de kangaeteru wa\n \n Hie kitta uso sae mo\n Tokashite yatte kureru no nara\n \n Kodoku wo shitta sainoujin to\n Asu wo eranda merankorii kanja\n \n Modorenai boku ni sayounara\n Yubi wo kuwaete naitemo muda dakara\n Itsuka mata\n \n Saishuu ressha wo matsu wa\n Anata no kaeri wa nai kedo\n Koko ni irubeki de wa nai koto\n Ima subete wo nomikome ya shinai kedo\n \n Tooku kara mitara anata shiawase sou ne demo\n Itakute itakute zenbu shitteru kara\n \n Anata wa itta shoumouhin sa\n Dakedo watakushi wa mada kangaeteru wa\n Itsuka mata kou yatte\n Odotte yatte kurenai ka\n \n Shinki wo matotta shounen shoujo\n Usa wo harashita iesu man kanja\n Daremo nanimono demo nai mono\n Shini wo shire ba saigo ni naru nara sa\n Shita ga kawaku made hanasou ze\n \n Soshite bokura itsuwa ni natte\n Ima futashika na emi wo ukabete wa\n Daremo shiranakatta monogatari wo ima\n Kimi ni hanasu kara\n",
                language: "JA_RO",
              },
              {
                content: "Here",
                language: "EN",
              },
            ],
          },
        },
        {
          title: "Tokyo Ghetto",
          cover:
            "https://www.lyrical-nonsense.com/wp-content/uploads/Eve-Otogi-1.jpg",
          releaseDate: new Date("2019-02-06"),
          language: "JA",
          altTitle: "トーキョーゲットー",
          lyricist: "Eve",
          composer: "Eve",
          lyrics: {
            create: [
              {
                content: "Daredemo ii ya daredemo ii kara dareka inai ka",
                language: "JA_RO",
              },

              {
                content: "Whoever",
                language: "EN",
              },
            ],
          },
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const a of artistData) {
    const artist = await prisma.artist.create({
      data: a,
    });
    console.log(`Created artist with id: ${artist.id}`);
  }
  console.log(`Seeding finished.`);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
