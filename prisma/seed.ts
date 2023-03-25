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
                content:
                  "どこにいっても\n行き詰まり　そして息道理を\nそのままどっかに　出すくだり\nそんな劣等も葛藤もみんな持ってる\nその理由は同じ\nえ？\nAh\nなんでもかんでも欲しがる世界じゃない？\nまた回る世界に飲まれている\nそれも理由は同じ\n膨らんだ、妄想、幻想、真相を、いやあれを探してる\nあれ、なに、わからないよ\nそれ、なに、甘い理想に\n落ちる\nwelcome to the dirty night\nみんな心の中までイカレちまっている\nwelcome to the dirty night\nそんな世界にみんなで寄り添いあっている\nwelcome to the dirty night\nみんな心の中から弱って朽ちていく\nwelcome to the dirty night\nそんな世界だから皆慰めあっている\nあれ、なに、わからないよ\nそれ、なに、辛い日々に\n沈む\nwelcome to the dirty night\nみんな心の中までイカレちまっている\nwelcome to the dirty night\nそんな世界にみんなで寄り添いあっている\nwelcome to the dirty night\nみんな心の中から弱って朽ちていく\nwelcome to the dirty night\nそんな世界だから皆慰めあっている\n愛で\n揺れる世界の中で僕達は\nキスをしあって生きている\n揺れる世界の中を僕達は\n手を取り合っている\nなぁ、なんて美しい世界だ\n僕ら何度裏切りあっていても\nまぁ、なんとか手を取り合うんだ\nまるで恋愛映画のラストシーンのような\n「愛で」\n靡く世界の中で僕達は\nキスをしあって生きている\n靡く世界の中を僕達は\n目を合わせあって生きる\nwelcome to the dirty night\nみんな心の中までイカレちまっている\nwelcome to the dirty night\nそんな世界にみんなで寄り添いあっている\nwelcome to the dirty night\nみんな心の中から弱って朽ちていく\nwelcome to the dirty night\nそんな世界だから皆慰めあっている\n",
                language: "JA",
              },
              {
                content:
                  "Doko ni ittemo\nIkizumari soshite iki douri wo\nSono mama dokka ni dasu kudari\nSonna rettou mo kattou mo minna motteru\nSono riyuu wa onaji\nE?\nAh\nNandemo kandemo hoshigaru sekai janai?\nMata mawaru sekai ni nomareteiru\nSore mo riyuu wa onaji\nFukuran da, mousou, gensou, shinsou wo, iya are wo sagashiteru\nAre, nani, wakaranai yo\nSore, nani, amai risou ni\nOchiru\nWelcome to the dirty night\nMinna kokoro no naka made ikare chimatteiru\nWelcome to the dirty night\nSonna sekai ni minna de yorisoi atteiru\nWelcome to the dirty night\nMinna kokoro no naka kara yowate kuchite iku\nWelcome to the dirty night\nSonna sekai dakara mina nagusame atteiru\nAre, nani, wakaranai yo\nSore, nani, tsurai hibi ni\nShizumu\nWelcome to the dirty night\nMinna kokoro no naka made ikare chimatteiru\nWelcome to the dirty night\nSonna sekai ni minna de yorisoi atteiru\nWelcome to the dirty night\nMinna kokoro no naka kara yowate kuchite iku\nWelcome to the dirty night\nSonna sekai dakara mina nagusame atteiru\nAi de\nYureru sekai no naka de bokutachi wa\nKisu wo shi atte ikiteiru\nYureru sekai no naka wo bokutachi wa\nTe wo tori atteiru\nNaa, nante utsukushii sekai da\nBokura nando uragiri atte ittemo\nMaa, nantoka te wo toriaun da\nMarude renai eiga no rasuto shiin no you na\n“Ai de”\nNabiku sekai no naka de bokutachi wa\nKisu wo shi atte ikiteiru\nNabiku sekai no naka wo bokutachi wa\nMe wo awase atte ikiru\nWelcome to the dirty night\nMinna kokoro no naka made ikare chimatteiru\nWelcome to the dirty night\nSonna sekai ni minna de yorisoi atteiru\nWelcome to the dirty night\nMinna kokoro no naka kara yowate kuchite iku\nWelcome to the dirty night\nSonna sekai dakara mina nagusame atteiru\n",
                language: "JA_RO",
              },
              {
                content:
                  "No matter where you go\nYou always hit a wall and get stuck, but then someone will take a stand\nIt’s all the same reason\nEveryone struggles and has conflicts\nThat’s why everyone carries it\nEh?\nAh,\nWhy don’t we all just want the same?\nWe’re all being sucked back into this cycle\nThat’s the same reason too\nTo discover what’s inside, this illusion, fantasy and truth\nHuh, what? I don’t get it\nWhat is it? I’m falling again\nInto sweet fantasy\nWelcome to the dirty night\nEveryone is crazed in their heart\nWelcome to the dirty night\nIn this world, we cling together\nWelcome to the dirty night\nEveryone is becoming weak and decayed in their heart\nWelcome to the dirty night\nThat’s why we’re all giving each other comfort\nHuh, What? I don’t get it\nWhat is it? On these hard days,\nI sink\nWelcome to the dirty night\nEveryone is crazed in their heart\nWelcome to the dirty night\nIn this world, we cling together\nWelcome to the dirty night\nEveryone is becoming weak and decayed in their heart\nWelcome to the dirty night\nThat’s why we’re all giving each other comfort\nWith love\nIn this dazzling world\nWe live, kissing each other\nIn this dazzling world\nWe stay close, living together\nHey, what a beautiful world\nAlthough we betray each other many times\nWell, we’re gonna take each other’s hands somehow\nIt’s like the last scene of a romantic movie\n“With love”\nIn this swaying world\nWe live, kissing each other\nIn this swaying world\nWe look each other in the eye, living together\nWelcome to the dirty night\nEveryone is crazed in their heart\nWelcome to the dirty night\nIn this world, we cling together\nWelcome to the dirty night\nEveryone is becoming weak and decayed in their heart\nWelcome to the dirty night\nThat’s why we’re all giving each other comfort\n",
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
                  "ここに蔓延る摩天楼\n君の確かな芽を摘んできた\n叶えたいもの全て奪い攫っては\n僕をねじ曲げてく\n価値観違い 嫌いなあいつは\n滑稽なんて嗤いあって\n上品な言葉 乗せあって待って焦って足掻いた\nせっせ 知恵を絞って せっせ 欲をかいて\nエゴに堕ちてゆけ\nあなたは言った 消耗品さ\nだけど私は まだ考えてるわ\nいつかまた こうやって\n踊ってやってくれないか\n辛気を纏った 少年少女\n憂さを晴らした イエスマン患者\n誰も何者でもないもの\n真意を知れば最期になるならさ\n舌が乾くまで話そうぜ\n虚勢を張って 自分を失った\n虚言を吐いて 幻になった\n馬鹿になって 宙を舞って\nしたらもう 壊れてしまいました\n純粋で透明な少年のさ\n感情に魔を差してやってんのさ\n思い出して思い出して考えては\n辿り着きさえもしないや\nあなたが言った 本当の意を\n世界の片隅で考えてるわ\n冷えきった 嘘さえも\n溶かしてやってくれるのなら\n孤独を知った才能人と\n明日を選んだ メランコリー患者\n戻れない僕にさようなら\n指を加えて 泣いても無駄だから\nいつかまた\n最終列車を待つわ\nあなたの帰りはないけど\nここに居るべきではないこと\n今全てを飲みこめやしないけど\n遠くからみたら あなた幸せそうねでも\n痛くて 痛くて 全部知ってるから\nあなたは言った 消耗品さ\nだけど私は まだ考えてるわ\nいつかまた こうやって\n踊ってやってくれないか\n辛気を纏った 少年少女\n憂さを晴らした イエスマン患者\n誰も何者でもないもの\n真意を知れば最期になるならさ\n舌が乾くまで話そうぜ\nそして僕ら逸話になって\n今不確かな笑みを浮かべては\n誰も知らなかった物語を今\n君に話すから\n",
                language: "JA",
              },
              {
                content:
                  "Koko ni habikoru matenrou\nKimi no tashika na me wo tsunde kita\nKanaeta imo no subete ubaisaratte wa\nBoku wo nejimageteku\nKachikan chigai kirai na aitsu wa\nKokkei nante warai atte\nJouhin na kotoba nose atte matte asette agaita\nSesse chie wo shibotte sesse yoku wo kaite\nEgo ni ochite yuke\nAnata wa itta shoumouhin sa\nDakedo watashi wa mada kangaeteru wa\nItsuka mata kou yatte\nOdotte yatte kurenai ka\nShinki wo matotta shounen shoujo\nUsa wo harashita iesu man kanja\nDaremo nanimono demo nai mono\nShini wo shireba saigo ni naru nara sa\nShita ga kawaku made hanasou ze\nKyosei wo hatte jibun wo ushinatta\nKyogen wo haite maboroshi ni natta\nBaka ni natte chuu wo matte\nShitara mou kowarete shimaimashita\nJunsui de toumei na shounen no sa\nKanjou ni ma wo sashite yatten no sa\nOmoidashite omoidashite kangaete wa\nTadoritsuki sae mo shinai ya\nAnata ga itta hontou no i wo\nSekai no katasumi de kangaeteru wa\nHie kitta uso sae mo\nTokashite yatte kureru no nara\nKodoku wo shitta sainoujin to\nAsu wo eranda merankorii kanja\nModorenai boku ni sayounara\nYubi wo kuwaete naitemo muda dakara\nItsuka mata\nSaishuu ressha wo matsu wa\nAnata no kaeri wa nai kedo\nKoko ni irubeki de wa nai koto\nIma subete wo nomikome ya shinai kedo\nTooku kara mitara anata shiawase sou ne demo\nItakute itakute zenbu shitteru kara\nAnata wa itta shoumouhin sa\nDakedo watakushi wa mada kangaeteru wa\nItsuka mata kou yatte\nOdotte yatte kurenai ka\nShinki wo matotta shounen shoujo\nUsa wo harashita iesu man kanja\nDaremo nanimono demo nai mono\nShini wo shire ba saigo ni naru nara sa\nShita ga kawaku made hanasou ze\nSoshite bokura itsuwa ni natte\nIma futashika na emi wo ukabete wa\nDaremo shiranakatta monogatari wo ima\nKimi ni hanasu kara\n",
                language: "JA_RO",
              },
              {
                content:
                  "At this place are overgrown skyscrapers\nWhich have come and taken buds that are certainly yours\nEverything I want granted has been taken away\nLeaving me distorted\nWith different values,\nthat guy who I hate,\nput on a ridiculous sneer\nDeceived by elegant words;\nThey waited, panicked and struggled\nRacking their brains and\nGrasping onto greed;\nThey fell into the abyss of ego\nThe \"consumable goods\" you mentioned -\nI'm still pondering about it\nSomeday won't you dance for me like this again?\nThe young boys and girls wrapped in feelings;\nThe \"yes\"-man patients who cleared their sorrows;\nThings not belonging to anyone nor nobody\nIf our lives come to an end when we know the true motives of others then\nLet's talk until our tongues go dry\nPut up a bluff and lost oneself;\nTold a lie and became an illusion;\nIf we became idiots and danced mid-air\nThen we would have already been destroyed\nA pure and transparent young boy;\nHis emotions have been dyed by evil and is doing it\nRecalling, recalling and thinking\nWon't even help with finding the way\nAt the corner of the world, I'm pondering\nAbout the true meaning of what you said\nIf you would melt even frozen lies for me then\nThe talented who understand solitude and\nThe melancholic patients who chose tomorrow\nIf it's goodbye to me who cannot return\nThen it's pointless to suck your finger and cry\nUntil we meet again someday\nI'll wait for the last train\nYou don't have a way to return though\nAll the things that shouldn't even be here;\nI will not understand everything right now\nWhen I looked from afar, you looked happy;\nBut it hurts and hurts\nBecause I know everything\nThe \"consumable goods\" you mentioned-\nI'm still pondering about it\nSomeday won't you dance for me like this again?\nThe young boys and girls wrapped in feelings;\nThe \"yes\"-man patients who cleared their sorrows;\nThings not belonging to anyone nor nobody\nIf our lives come to an end when we know the true motives of others then\nLet's talk until our tongues go dry\nAnd so we became anecdotes of our own\nNow, with an uncertain smile;\nThe stories that no one knew about-54\nI'll tell you them right now\n",
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
