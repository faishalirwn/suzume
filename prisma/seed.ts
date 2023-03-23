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
                language: "JA",
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
                language: "JA",
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
                language: "JA",
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
                content: "Koko ni habikoru matenrou",
                language: "JA",
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
                language: "JA",
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
