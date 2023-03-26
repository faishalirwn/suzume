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
          language: "ja",
          altTitle: "不可幸力",
          videoLink: "https://www.youtube.com/watch?v=Gbz2C2gQREI",
          lyrics: {
            create: [
              {
                content:
                  "どこにいっても\n行き詰まり　そして息道理を\nそのままどっかに　出すくだり\nそんな劣等も葛藤もみんな持ってる\nその理由は同じ\nえ？\nAh\nなんでもかんでも欲しがる世界じゃない？\nまた回る世界に飲まれている\nそれも理由は同じ\n膨らんだ、妄想、幻想、真相を、いやあれを探してる\nあれ、なに、わからないよ\nそれ、なに、甘い理想に\n落ちる\nwelcome to the dirty night\nみんな心の中までイカレちまっている\nwelcome to the dirty night\nそんな世界にみんなで寄り添いあっている\nwelcome to the dirty night\nみんな心の中から弱って朽ちていく\nwelcome to the dirty night\nそんな世界だから皆慰めあっている\nあれ、なに、わからないよ\nそれ、なに、辛い日々に\n沈む\nwelcome to the dirty night\nみんな心の中までイカレちまっている\nwelcome to the dirty night\nそんな世界にみんなで寄り添いあっている\nwelcome to the dirty night\nみんな心の中から弱って朽ちていく\nwelcome to the dirty night\nそんな世界だから皆慰めあっている\n愛で\n揺れる世界の中で僕達は\nキスをしあって生きている\n揺れる世界の中を僕達は\n手を取り合っている\nなぁ、なんて美しい世界だ\n僕ら何度裏切りあっていても\nまぁ、なんとか手を取り合うんだ\nまるで恋愛映画のラストシーンのような\n「愛で」\n靡く世界の中で僕達は\nキスをしあって生きている\n靡く世界の中を僕達は\n目を合わせあって生きる\nwelcome to the dirty night\nみんな心の中までイカレちまっている\nwelcome to the dirty night\nそんな世界にみんなで寄り添いあっている\nwelcome to the dirty night\nみんな心の中から弱って朽ちていく\nwelcome to the dirty night\nそんな世界だから皆慰めあっている\n",
                language: "ja",
              },
              {
                content:
                  "Doko ni ittemo\nIkizumari soshite iki douri wo\nSono mama dokka ni dasu kudari\nSonna rettou mo kattou mo minna motteru\nSono riyuu wa onaji\nE?\nAh\nNandemo kandemo hoshigaru sekai janai?\nMata mawaru sekai ni nomareteiru\nSore mo riyuu wa onaji\nFukuran da, mousou, gensou, shinsou wo, iya are wo sagashiteru\nAre, nani, wakaranai yo\nSore, nani, amai risou ni\nOchiru\nWelcome to the dirty night\nMinna kokoro no naka made ikare chimatteiru\nWelcome to the dirty night\nSonna sekai ni minna de yorisoi atteiru\nWelcome to the dirty night\nMinna kokoro no naka kara yowate kuchite iku\nWelcome to the dirty night\nSonna sekai dakara mina nagusame atteiru\nAre, nani, wakaranai yo\nSore, nani, tsurai hibi ni\nShizumu\nWelcome to the dirty night\nMinna kokoro no naka made ikare chimatteiru\nWelcome to the dirty night\nSonna sekai ni minna de yorisoi atteiru\nWelcome to the dirty night\nMinna kokoro no naka kara yowate kuchite iku\nWelcome to the dirty night\nSonna sekai dakara mina nagusame atteiru\nAi de\nYureru sekai no naka de bokutachi wa\nKisu wo shi atte ikiteiru\nYureru sekai no naka wo bokutachi wa\nTe wo tori atteiru\nNaa, nante utsukushii sekai da\nBokura nando uragiri atte ittemo\nMaa, nantoka te wo toriaun da\nMarude renai eiga no rasuto shiin no you na\n“Ai de”\nNabiku sekai no naka de bokutachi wa\nKisu wo shi atte ikiteiru\nNabiku sekai no naka wo bokutachi wa\nMe wo awase atte ikiru\nWelcome to the dirty night\nMinna kokoro no naka made ikare chimatteiru\nWelcome to the dirty night\nSonna sekai ni minna de yorisoi atteiru\nWelcome to the dirty night\nMinna kokoro no naka kara yowate kuchite iku\nWelcome to the dirty night\nSonna sekai dakara mina nagusame atteiru\n",
                language: "tra",
              },
              {
                content:
                  "No matter where you go\nYou always hit a wall and get stuck, but then someone will take a stand\nIt’s all the same reason\nEveryone struggles and has conflicts\nThat’s why everyone carries it\nEh?\nAh,\nWhy don’t we all just want the same?\nWe’re all being sucked back into this cycle\nThat’s the same reason too\nTo discover what’s inside, this illusion, fantasy and truth\nHuh, what? I don’t get it\nWhat is it? I’m falling again\nInto sweet fantasy\nWelcome to the dirty night\nEveryone is crazed in their heart\nWelcome to the dirty night\nIn this world, we cling together\nWelcome to the dirty night\nEveryone is becoming weak and decayed in their heart\nWelcome to the dirty night\nThat’s why we’re all giving each other comfort\nHuh, What? I don’t get it\nWhat is it? On these hard days,\nI sink\nWelcome to the dirty night\nEveryone is crazed in their heart\nWelcome to the dirty night\nIn this world, we cling together\nWelcome to the dirty night\nEveryone is becoming weak and decayed in their heart\nWelcome to the dirty night\nThat’s why we’re all giving each other comfort\nWith love\nIn this dazzling world\nWe live, kissing each other\nIn this dazzling world\nWe stay close, living together\nHey, what a beautiful world\nAlthough we betray each other many times\nWell, we’re gonna take each other’s hands somehow\nIt’s like the last scene of a romantic movie\n“With love”\nIn this swaying world\nWe live, kissing each other\nIn this swaying world\nWe look each other in the eye, living together\nWelcome to the dirty night\nEveryone is crazed in their heart\nWelcome to the dirty night\nIn this world, we cling together\nWelcome to the dirty night\nEveryone is becoming weak and decayed in their heart\nWelcome to the dirty night\nThat’s why we’re all giving each other comfort\n",
                language: "en",
              },
            ],
          },
        },
        {
          title: "odoriko",
          cover:
            "https://www.lyrical-nonsense.com/wp-content/uploads/2021/11/Vaundy-odoriko.jpg",
          language: "ja",
          altTitle: "踊り子",
          videoLink: "https://www.youtube.com/watch?v=7HgJIAUtICU",
          lyrics: {
            create: [
              {
                content:
                  "ねぇ、どっかに置いてきたような\n 事が一つ二つ浮いているけど\n ねぇ、ちゃんと拾っておこう\n はじけて忘れてしまう前に\n 回り出した　あの子と僕の未来が\n 止まりどっかで　またやり直せたら\n 回り出した　あの子と僕が被害者\n づらでどっかを　また練り歩けたらな\n とぅるるる　とぅるるる　とぅるる\n とぅるるる　とぅるるる　とぅるる\n とぅるるる　とぅるるる　とぅるる\n とぅるるる　とぅるるる　とぅるる\n あのね、私あなたに会ったの\n 夢の中に置いてきたけどね\n ねぇ、どうして私が好きなの\n 一度しか会ったことがないのにね\n 思いを蹴って\n 二人でしてんだ\n 壊(わす)れない愛を歌う\n 言葉を二人に課して\n 誓いをたてんだ\n 忘れない愛を歌うようにね\n 回り出した　あの子と僕の未来が\n 止まりどっかで　またやり直せたら\n 回り出した　あの子と僕が被害者\n づらでどっかを　また練り歩けたらな\n とぅるるる　とぅるるる　とぅるる\n とぅるるる　とぅるるる　とぅるる\n とぅるるる　とぅるるる　とぅるる\n とぅるるる　とぅるるる　とぅるる\n とぅるるる　とぅるるる　とぅるる\n とぅるるる　とぅるるる　とぅるる\n とぅるるる　とぅるるる　とぅるる\n とぅるるる　とぅるるる　とぅるる\n 回り出した　あの子と僕の未来が\n 止まりどっかで　またやり直せたら\n 回り出した　あの子と僕が被害者\n づらでどっかを　また練り歩けたらな\n 時代に乗って僕たちは\n 変わらず愛に生きるだろう\n 僕らが散って残るのは\n 変わらぬ愛の歌なんだろうな\n",
                language: "ja",
              },
              {
                content:
                  "Nee, dokka ni oite kita you na\n Koto ga hitotsu futatsu uiteiru kedo\n Nee, chanto hirotte okou\n Hajikete wasurete shimau mae ni\n Mawaridashita ano ko to boku no mirai ga\n Tomari dokka de mata yarinaosetara\n Mawaridashita ano ko to boku ga higaisha\n Zura de dokka wo mata neriaruketara na\n Turururu turururu tururu\n Turururu turururu tururu\n Turururu turururu tururu\n Turururu turururu tururu\n Ano ne, watashi anata ni atta no\n Yume no naka ni oite kita kedo ne\n Nee, doushite watashi ga suki na no\n Ichido shika atta koto ga nai no ni ne\n Omoi wo kette\n Futari de shiten da\n Wasurenai ai wo utau\n Kotoba wo futari ni kashite\n Chikai wo taten da\n Wasurenai ai wo utau you ni ne\n Mawaridashita ano ko to boku no mirai ga\n Tomari dokka de mata yarinaosetara\n Mawaridashita ano ko to boku ga higaisha\n Zura de dokka wo mata neriaruketara na\n Turururu turururu tururu\n Turururu turururu tururu\n Turururu turururu tururu\n Turururu turururu tururu\n Turururu turururu tururu\n Turururu turururu tururu\n Turururu turururu tururu\n Turururu turururu tururu\n Mawaridashita ano ko to boku no mirai ga\n Tomari dokka de mata yarinaosetara\n Mawaridashita ano ko to boku ga higaisha\n Zura de dokka wo mata neriaruketara na\n Jidai ni notte bokutachi wa\n Kawarazu ai ni ikiru darou\n Bokura ga chitte nokoru no wa\n Kawaranu ai no uta nan darou na\n",
                language: "tra",
              },
            ],
          },
        },
        {
          title: "Shiwaawase",
          cover:
            "https://www.lyrical-nonsense.com/wp-content/uploads/2020/12/Vaundy-SHIAAWASE.jpg",
          language: "ja",
          altTitle: "しわあわせ",
          videoLink: "https://www.youtube.com/watch?v=JwmGruvGt_I",
          lyrics: {
            create: [
              {
                content:
                  "僕の時価総額400円の心臓と\n 絵に描いたような君の綺麗な心臓を\n 合わせてできたしわの数が\n 僕達の未来の価値だ\n 残された時間が少ないのなら\n 崩れてく時間が増えてくのなら\n 零さないようにあわせて\n 変わらない\n 変われないよ　僕ら\n 今もしっかり握っている\n ちぎれない\n ちぎらないよ　僕ら\n 今もしっかり繋いでる手\n 僕の一生分なり続けている心拍と\n 透き通るような君の綺麗な一拍を\n 合わせてできた波の数だけ\n 僕達は揺らめきあってた\n 過ぎていく時が早すぎるのなら\n 有り余る隙間が悲しいのなら\n 零さないようにあわせて\n 変わらない\n 変われないよ　僕ら\n 今もしっかり握っている\n ちぎれない\n ちぎらないよ　僕ら\n 今もしっかり繋いでる\n 重なるひびを僕達は\n 流るるひびも僕達は\n 思い出すこともなくなって\n しまうんだろう\n しまうんだろうって\n 重なるひびを僕達は\n 流るるひびも僕達は\n 思い出すこともなくなって\n そんな\n しわあわせで\n 変わらない\n 変われないよ　僕ら\n 今もしっかり握っている\n ちぎれない\n ちぎらないよ　僕ら\n 今もしっかり繋いでる手\n 溢れ出す願い込めて僕らは\n 今から君の見てる方へと\n やるせない夢が覚めた頃に\n また、しわをあわせて\n",
                language: "ja",
              },
              {
                content:
                  "Boku no jika sougaku yonhyakuen no shinzou to E ni kaita you na kimi no kirei na shinzou wo Awasete dekita shiwa no kazu ga Boku tachi no mirai no kachi da Nokosareta jikan ga sukunai no nara Kuzureteku jikan ga fueteku no nara Kobosanai you ni awasete Kawaranai Kawarenai yo bokura Ima mo shikkari nigitteiru Chigirenai Chigiranai yo bokura Ima mo shikkari tsunaideru te Boku no isshoubun naritsuzuketeiru shinpaku to Sukitooru you na kimi no kirei na ippaku wo Awasete dekita nami no kazu dake Boku tachi wa yurameki atteta Sugite iku toki ga hayasugiru no nara Ariamaru sukima ga kanashii no nara Kobosanai you ni awasete Kawaranai Kawarenai yo bokura Ima mo shikkari nigitteiru Chigirenai Chigiranai yo bokura Ima mo shikkari tsunaideru Kasanaru hibi wo boku tachi wa Nagaruru hibi mo boku tachi wa Omoidasu koto mo nakunatte Shimaun darou Shimaun darou tte Kasanaru hibi wo boku tachi wa Nagaruru hibi mo boku tachi wa Omoidasu koto mo nakunatte Sonna Shiwa awase de Kawaranai Kawarenai yo bokura Ima mo shikkari nigitteiru Chigirenai Chigiranai yo bokura Ima mo shikkari tsunaideru te Afuredasu negai komete bokura wa Ima kara kimi no miteru hou e to Yarusenai yume ga sameta koro ni Mata, shiwa wo awasete",
                language: "tra",
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
          language: "ja",
          altTitle: "ラストダンス",
          videoLink: "https://www.youtube.com/watch?v=CLdeykXCZX4",
          lyrics: {
            create: [
              {
                content:
                  "ここに蔓延る摩天楼\n君の確かな芽を摘んできた\n叶えたいもの全て奪い攫っては\n僕をねじ曲げてく\n価値観違い 嫌いなあいつは\n滑稽なんて嗤いあって\n上品な言葉 乗せあって待って焦って足掻いた\nせっせ 知恵を絞って せっせ 欲をかいて\nエゴに堕ちてゆけ\nあなたは言った 消耗品さ\nだけど私は まだ考えてるわ\nいつかまた こうやって\n踊ってやってくれないか\n辛気を纏った 少年少女\n憂さを晴らした イエスマン患者\n誰も何者でもないもの\n真意を知れば最期になるならさ\n舌が乾くまで話そうぜ\n虚勢を張って 自分を失った\n虚言を吐いて 幻になった\n馬鹿になって 宙を舞って\nしたらもう 壊れてしまいました\n純粋で透明な少年のさ\n感情に魔を差してやってんのさ\n思い出して思い出して考えては\n辿り着きさえもしないや\nあなたが言った 本当の意を\n世界の片隅で考えてるわ\n冷えきった 嘘さえも\n溶かしてやってくれるのなら\n孤独を知った才能人と\n明日を選んだ メランコリー患者\n戻れない僕にさようなら\n指を加えて 泣いても無駄だから\nいつかまた\n最終列車を待つわ\nあなたの帰りはないけど\nここに居るべきではないこと\n今全てを飲みこめやしないけど\n遠くからみたら あなた幸せそうねでも\n痛くて 痛くて 全部知ってるから\nあなたは言った 消耗品さ\nだけど私は まだ考えてるわ\nいつかまた こうやって\n踊ってやってくれないか\n辛気を纏った 少年少女\n憂さを晴らした イエスマン患者\n誰も何者でもないもの\n真意を知れば最期になるならさ\n舌が乾くまで話そうぜ\nそして僕ら逸話になって\n今不確かな笑みを浮かべては\n誰も知らなかった物語を今\n君に話すから\n",
                language: "ja",
              },
              {
                content:
                  "Koko ni habikoru matenrou\nKimi no tashika na me wo tsunde kita\nKanaeta imo no subete ubaisaratte wa\nBoku wo nejimageteku\nKachikan chigai kirai na aitsu wa\nKokkei nante warai atte\nJouhin na kotoba nose atte matte asette agaita\nSesse chie wo shibotte sesse yoku wo kaite\nEgo ni ochite yuke\nAnata wa itta shoumouhin sa\nDakedo watashi wa mada kangaeteru wa\nItsuka mata kou yatte\nOdotte yatte kurenai ka\nShinki wo matotta shounen shoujo\nUsa wo harashita iesu man kanja\nDaremo nanimono demo nai mono\nShini wo shireba saigo ni naru nara sa\nShita ga kawaku made hanasou ze\nKyosei wo hatte jibun wo ushinatta\nKyogen wo haite maboroshi ni natta\nBaka ni natte chuu wo matte\nShitara mou kowarete shimaimashita\nJunsui de toumei na shounen no sa\nKanjou ni ma wo sashite yatten no sa\nOmoidashite omoidashite kangaete wa\nTadoritsuki sae mo shinai ya\nAnata ga itta hontou no i wo\nSekai no katasumi de kangaeteru wa\nHie kitta uso sae mo\nTokashite yatte kureru no nara\nKodoku wo shitta sainoujin to\nAsu wo eranda merankorii kanja\nModorenai boku ni sayounara\nYubi wo kuwaete naitemo muda dakara\nItsuka mata\nSaishuu ressha wo matsu wa\nAnata no kaeri wa nai kedo\nKoko ni irubeki de wa nai koto\nIma subete wo nomikome ya shinai kedo\nTooku kara mitara anata shiawase sou ne demo\nItakute itakute zenbu shitteru kara\nAnata wa itta shoumouhin sa\nDakedo watakushi wa mada kangaeteru wa\nItsuka mata kou yatte\nOdotte yatte kurenai ka\nShinki wo matotta shounen shoujo\nUsa wo harashita iesu man kanja\nDaremo nanimono demo nai mono\nShini wo shire ba saigo ni naru nara sa\nShita ga kawaku made hanasou ze\nSoshite bokura itsuwa ni natte\nIma futashika na emi wo ukabete wa\nDaremo shiranakatta monogatari wo ima\nKimi ni hanasu kara\n",
                language: "tra",
              },
              {
                content:
                  "At this place are overgrown skyscrapers\nWhich have come and taken buds that are certainly yours\nEverything I want granted has been taken away\nLeaving me distorted\nWith different values,\nthat guy who I hate,\nput on a ridiculous sneer\nDeceived by elegant words;\nThey waited, panicked and struggled\nRacking their brains and\nGrasping onto greed;\nThey fell into the abyss of ego\nThe \"consumable goods\" you mentioned -\nI'm still pondering about it\nSomeday won't you dance for me like this again?\nThe young boys and girls wrapped in feelings;\nThe \"yes\"-man patients who cleared their sorrows;\nThings not belonging to anyone nor nobody\nIf our lives come to an end when we know the true motives of others then\nLet's talk until our tongues go dry\nPut up a bluff and lost oneself;\nTold a lie and became an illusion;\nIf we became idiots and danced mid-air\nThen we would have already been destroyed\nA pure and transparent young boy;\nHis emotions have been dyed by evil and is doing it\nRecalling, recalling and thinking\nWon't even help with finding the way\nAt the corner of the world, I'm pondering\nAbout the true meaning of what you said\nIf you would melt even frozen lies for me then\nThe talented who understand solitude and\nThe melancholic patients who chose tomorrow\nIf it's goodbye to me who cannot return\nThen it's pointless to suck your finger and cry\nUntil we meet again someday\nI'll wait for the last train\nYou don't have a way to return though\nAll the things that shouldn't even be here;\nI will not understand everything right now\nWhen I looked from afar, you looked happy;\nBut it hurts and hurts\nBecause I know everything\nThe \"consumable goods\" you mentioned-\nI'm still pondering about it\nSomeday won't you dance for me like this again?\nThe young boys and girls wrapped in feelings;\nThe \"yes\"-man patients who cleared their sorrows;\nThings not belonging to anyone nor nobody\nIf our lives come to an end when we know the true motives of others then\nLet's talk until our tongues go dry\nAnd so we became anecdotes of our own\nNow, with an uncertain smile;\nThe stories that no one knew about-54\nI'll tell you them right now\n",
                language: "en",
              },
            ],
          },
        },
        {
          title: "Tokyo Ghetto",
          cover:
            "https://www.lyrical-nonsense.com/wp-content/uploads/Eve-Otogi-1.jpg",
          language: "ja",
          altTitle: "トーキョーゲットー",
          videoLink: "https://www.youtube.com/watch?v=PvzBWFGEz8M",
          lyrics: {
            create: [
              {
                content:
                  "誰でもいいや　誰でもいいから　誰かいないか\n 声ではないが　睨む視線が　２つと在ると思えた\n これでおさらば　呪縛からさらば夜が解けた\n 好奇心だった　有刺鉄線の向こう側へと\n 全然興味ないって　蝶が舞い込めば\n 想像通りだった　といえば嘘になるが\n 退廃的だった　コーヒーの泡をこぼした\n そんなそんな　毎日だった僕の前に\n 現れた君は\n どうしたってどうしたって　進めないままだ　ヒッピーなこの街の性に　\n どうやってどうやって理由を　”大事なんだ全部”　聞こえだけはいいけれど\n 向こう側から突如現れて気付けば　連れて行かれてしまいそうな僕ら\n 手放す事に怯えて　君は今日もステイ　君は今日もステイ\n 貴方々には　貴方々にはお世話になった\n 覚えはないが　何かと言いたい　そんな顔していますが\n 目に映るものが　ここに在るもの全てが　偽物でした\n 情にかけたって　棒に振ったって\n 今に始まる　精々舌を噛んでそこで黙っていれば\n 想定通りだった　といえば嘘になるが\n 感傷的だった　君らしくはないが\n そんなそんな　表情が　一瞬僕の目には　美しく映ってました\n ずっとどこかで貴方に憧れ　その度自分を　失いかけていました\n 本物を超えろ　ビビれば　君は今日もステイ\n どうしたってどうしたって　進めないままだ　ヒッピーなこの街の性に　\n どうやってどうやって理由を　”大事なんだ全部”　聞こえだけはいいけれど\n 向こう側から突如現れて気付けば　連れて行かれてしまいそうな僕ら\n 手放す事に怯えて　君は今日もステイ　君は今日もステイ\n ずっとどこかで貴方に憧れ　その度自分を　失いかけていました\n 本物を超えろ　ビビれば　君は今日もステイ　君は今日もステイ\n 君は今日もステイ\n",
                language: "ja",
              },
              {
                content:
                  "Daredemo ii ya daredemo ii kara dareka inai ka\n Koe de wa nai ga niramu shisen ga futatsu to aru to omoeta\n Kore de osaraba jubaku kara saraba yoru ga hodoketa\n Koukishin datta yuushitessen no mukougawa e to\n Zenzen kyoumi nai tte chou ga maikomeba\n Souzoudoori datta to ieba uso ni naru ga\n Taihaiteki datta koohii no awa wo koboshita\n Sonna sonna mainichi datta boku no mae ni\n Arawareta kimi wa　\n Doushita tte doushita tte susumenai mama da hippii na kono machi no saga ni\n Douyatte douyatte riyuu wo “daiji nanda zenbu” kikoe dake wa ii keredo\n Mukougawa kara totsujo arawarete kizukeba tsureteikarete shimaisou na bokura\n Tebanasu koto ni obiete kimi wa kyou mo sutei kimi wa kyou mo sutei\n Anatagata ni wa anatagata ni wa osewa ni natta\n Oboe wa nai ga nanika to iitai sonna kao shiteimasu ga\n Me ni utsuru mono ga koko ni aru mono subete ga nisemono deshita\n Jou ni kaketatte bou ni futtatte\n Ima ni hajimaru seizei shita wo kande soko de damatte ireba\n Souteidoori datta to ieba uso ni naru ga\n Kanshouteki datta kimi rashiku wa nai ga\n Sonna sonna hyoujou ga isshun boku no me ni wa utsukushiku utsuttemashita\n Zutto dokoka de anata ni akogare sono tabi jibun wo ushinai kaketeimashita\n Honmono wo koero bibireba kimi wa kyou mo sutei\n Doushita tte doushita tte susumenai mama da hippii na kono machi no saga ni\n Douyatte douyatte riyuu wo “daiji nanda zenbu” kikoe dake wa ii keredo”\n Mukougawa kara totsujo arawarete kizukeba tsureteikarete shimaisou na bokura\n Tebanasu koto ni obiete kimi wa kyou mo sutei\n Zutto dokoka de anata ni akogare sono tabi jibun wo ushinai kaketeimashita\n Honmono wo koero bibireba kimi wa kyou mo sutei kimi wa kyou mo sutei\n Kimi wa kyou mo sutei\n",
                language: "tra",
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "ATARASHII GAKKO!",
    bio: `Atarashii Gakko!, known in Japan as Atarashii Gakkou no Leaders, is a Japanese girl group formed in 2015. The group is affiliated with ASOBISYSTEM.
    Atarashii Gakko! made its Japanese debut in June 2017 under Victor Entertainment with the single Dokubana. The group made its worldwide debut in January 2021 under 88rising with the single NAINAINAI.
    
    From Wikipedia (https://en.wikipedia.org/wiki/Atarashii_Gakko!) under Creative Commons Attribution CC-BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/legalcode)`,
    cover:
      "https://lh3.googleusercontent.com/dNg9ePIWP8C_zNv-ic-kNaWHwRsofCRb7CRAw_TbSLD1exgphghAe4Os2rvY5p9MIfOWm-DoDbbgsGs=w1440-h600-p-l90-rj",
    songs: {
      create: [
        {
          title: "OTONABLUE",
          cover:
            "https://www.lyrical-nonsense.com/wp-content/uploads/2023/03/ATARASHII-GAKKO-Otona-Blue.jpg",
          language: "ja",
          altTitle: "オトナブルー",
          videoLink: "https://www.youtube.com/watch?v=l446hUqQ7GY",
          lyrics: {
            create: [
              {
                content:
                  "わかってる　ほしいんでしょ？\n艶やかな　この唇\nヤワな男たち　惹き寄せる\n息を呑むほどに　甘い蜜\nわかってる　ほしいんでしょ？\n二度見する　この躰\n汗ばむ街　一人歩けば\n淫らな視線が絡みつく\nねえ何を期待してるの？\nそのうちじゃなくて　今すぐがいいの\n大人の恋に焦がれて\n見た目よりも　残るあどけない\nAh 心だけが　Ah 先走る\n青い蕾のまま　大人振る\nわかってる　ほしいんでしょ？\n刺激する　私の全て\n冷めた瞳まで魅了する\nいつかは花になるアマリリス\n優しいだけの　言葉じゃなくて\n心で繋がりたくて\nありきたりな　メイクじゃ隠せない\nAh 憧れだけ　Ah 夢を見る\nあなたの前で　また大人振る\nそのうちじゃなくて　今すぐがいいの\n大人の恋に焦がれて\n見た目よりも　残るあどけない\nAh 気持ちだけが　Ah から回る\n私を見つけて\n優しいだけの　言葉じゃなくて\n心で繋がりたくて\nありきたりな　メイクじゃ隠せない\nAh 憧れだけ　Ah 夢を見る\nまだ見ぬ恋路を　追いかけて　追いかけて\nまた　オトナブルー\n",
                language: "ja",
              },
              {
                content:
                  "Wakatteru hoshiin desho?\n Tsuyayaka na kono kuchibiru\n Yawana otoko tachi hikiyoseru\n Iki wo nomu hodo ni amai mitsu\n Wakatteru hoshiin desho?\n Nidome suru kono karada\n Asebamu machi hitori arukeba\n Midara na shisen ga karamitsuku\n Nee nani wo kitai shiteru no?\n Sono uchi janakute ima sugu ga ii no\n Otona no koi ni kogarete\n Mitame yori mo nokoru adokenai\n Ah kokoro dake ga Ah sakibashiru\n Aoi tsubomi no mama otona buru\n Wakatteru hoshiin desho?\n Shigeki suru watashi no subete\n Sameta hitomi made miryou suru\n Itsuka wa hana ni naru amaririsu\n Yasashii dake no kotoba janakute\n Kokoro de tsunagaritakute\n Arikitari na meiku ja kakusenai\n Ah akogare dake Ah yume wo miru\n Anata no mae de mata otona buru\n Sono uchi janakute ima sugu ga ii no\n Otona no koi ni kogarete\n Mitame yori mo nokoru adokenai\n Ah kimochi dake ga Ah karamawaru\n Watashi wo mitsukete\n Yasashii dake no kotoba janakute\n Kokoro de tsunagaritakute\n Arikitari na meiku ja kakusenai\n Ah akogare dake Ah yume wo miru\n Mada minu koiji wo oikakete oikakete\n Mata otona buruu\n",
                language: "tra",
              },
              {
                content:
                  "I know what you want,\n You want my alluring lips, don’t you?\n Drawing in all these desperate men\n With sweet nectar that takes your breath away.\n You know what you want, don’t you?\n My figure that has you mesmerized,\n Walking alone on the streets,\n The lusty gazes entangle with me.\n Hey, what are you expecting from me?\n Not later, I want it right now,\n I long for mature love.\n Younger than it looks,\n My heart runs ahead.\n I’ve yet to bloom, but I still pretend to\n I know what you want,\n you want my entire being that provokes you.\n Captivating you with my cold gaze.\n Someday, I’ll become a flower, an amaryllis.\n I don’t just want gentle words;\n I want to connect to you with my heart.\n My desires cannot be hidden by ordinary makeup.\n I only dream of my longings.\n I try to act mature in front of you, again.\n Not later, I want it right now,\n I long for mature love.\n Younger than it looks,\n My heart runs ahead.\n Come find me.\n I don’t just want gentle words;\n I want to connect to you with my heart.\n My desires cannot be hidden by ordinary makeup.\n I only dream of my longings\n Chasing after an unknown path of love, Chasing after it, chasing after it,\n I’m feeling OTONABLUE again.\n",
                language: "en",
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
