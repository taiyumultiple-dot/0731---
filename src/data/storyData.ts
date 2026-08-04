import { VolumeData, QuestItem } from "../types";

export const STORY_VOLUMES: VolumeData[] = [
  {
    id: 1,
    title: "第0篇：多重宇宙的抉擇",
    subtitle: "在迷惘與輪迴之間，找到屬於自己的選擇",
    summary:
      "高中的可華害怕重蹈父親平庸輪迴的覆轍。在半夢半醒的強光中，他穿梭於無數平行宇宙，最終落入長大後的辦公室桌前。面對神祕畫面的『YES/NO』抉擇與長大後的王小文，他邁出了尋找自我的第一步。",
    coverBadge: "主線篇章",
    chapters: [
      {
        id: 101,
        volumeId: 1,
        title: "第一章：辦公室的 GLITCH 與五扇門",
        subtitle: "從輪迴職場到折疊城市的跨越",
        levels: [
          {
            id: 1,
            volumeId: 1,
            chapterId: 101,
            title: "多重宇宙的抉擇",
            subtitle: "3 位數電腦終端破譯",
            staminaCost: 10,
            coinReward: 100,
            clientName: "來自未來的引導（王小文）",
            narrative:
              "清晨，父親開車載可華上學，隨口一句「等你出社會工作，才知道什麼叫壓力」讓可華陷入沈思——他望著父親疲憊的側臉，忍不住想：爸說的那種幸福人生，真的是幸福嗎？半夢半醒間，車窗外爆發出刺眼強光，將他整個世界吞沒──他以高中生模樣墜入光怪陸離的異次元，劇烈穿梭旋轉後重重跌落在辦公桌上，發現自己已經變成中年大人模樣，驚慌失措！同事只顧催他做事，直到電腦螢幕跳出視窗傳來一個檔案：「探索，YES/NO」。當可華顫抖著按下 YES，四周閃動電腦 BUG GLITCH，門中走出了長大後的王小文...",
            openingDialogue: [
              {
                speaker: "父親 (開車)",
                text: "「昨晚有因為準備考試熬夜嗎？」",
                portrait: "doctor",
              },
              {
                speaker: "可華 (打哈欠)",
                text: "「讀書真的好累，班上同學都是學霸，時間總是不夠用，書好像永遠讀不完……為什麼要過這樣的生活？」",
                portrait: "detective",
              },
              {
                speaker: "父親",
                text: "「學生只需要好好讀書，是很幸福的！等你出社會工作，才知道什麼叫壓力。好好用功讀書，考上大學，未來才會有好工作，才會有幸福的人生啊！」",
                portrait: "doctor",
              },
              {
                speaker: "可華 (心聲)",
                text: "「爸說的那種幸福人生……真的是幸福嗎？我會不會，最後也變成和爸一樣……」",
                portrait: "detective",
              },
              {
                speaker: "可華 (半夢半醒)",
                text: "「怎麼這麼亮……到底是發生了什麼……啊！！」",
                portrait: "detective",
              },
              {
                speaker: "可華 (驚醒)",
                text: "「（大喘氣）蛤……？這、這是哪裡？！」",
                portrait: "detective",
              },
              {
                speaker: "同事",
                text: "「又在做夢了，上班不要偷懶耶！」",
                portrait: "doctor",
              },
              {
                speaker: "可華 (驚慌)",
                text: "「我……我還是高中生啊！我剛剛明明在我爸的車上……你在說什麼？！」",
                portrait: "detective",
              },
              {
                speaker: "同事 (翻白眼)",
                text: "「假裝有病看醫生啊？事沒做完別想走。」",
                portrait: "doctor",
              },
              {
                speaker: "可華 (頹然)",
                text: "「這到底是怎麼了……我該怎麼辦……」",
                portrait: "detective",
              },
              {
                speaker: "神秘通話者 (電腦螢幕)",
                text: "「你真的想要改變？」",
                portrait: "suspect",
              },
              {
                speaker: "可華",
                text: "「什麼意思？」",
                portrait: "detective",
              },
              {
                speaker: "神秘通話者 (電腦螢幕)",
                text: "「檔案已送達。請選擇：探索，YES／NO。」",
                portrait: "suspect",
              },
              {
                speaker: "成年王小文 (神秘女子)",
                text: "「答對了。跟著我！」",
                portrait: "charlotte",
              },
              {
                speaker: "成年王小文",
                text: "「來吧。我們必須穿過這五道關卡，才能回到真正的家。」",
                portrait: "charlotte",
              },
            ],
            puzzleConfig: {
              type: "1a2b",
              digitsCount: 3,
              secretNumber: "482",
            },
            endingHook:
              "四周像是電腦 BUG GLITCH 一樣閃動！YES 門大開，成年王小文牽著可華的手邁入門中，門後竟然是如《全面啟動》般折疊高聳的大樓群！\n\n【密碼彩蛋】4-8-2：強光穿梭時閃過的 4 個平行世界片段、螢幕倒數停在的 8 秒、最終只剩下的 2 扇門——那正是這一切發生的瞬間。",
            unlockedClueItem: "GLITCH 故障門的鑰匙",
          },
          {
            id: 2,
            volumeId: 1,
            chapterId: 101,
            title: "延遲的信件",
            subtitle: "凱撒密碼文字解密",
            staminaCost: 10,
            coinReward: 120,
            clientName: "可華 (高中記憶)",
            narrative:
              "穿過第一扇門後，眼前出現了高中教室與辦公室交錯的奇異景象。桌面上一封封信件上記錄著可華內心深處對未來的恐懼，內容被轉化成了 encrypted 暗碼，需要透過位移還原出真言。",
            openingDialogue: [
              {
                speaker: "成年王小文",
                text: "「這裡是你過去恐懼的具像化。這些信件藏著你不敢面對的真實心聲，解開它，我們才能繼續往前。」",
                portrait: "charlotte",
              },
              {
                speaker: "可華",
                text: "「這是我高中的字跡...『WUDQ VIRUP』？這代表什麼意思？」",
                portrait: "detective",
              },
            ],
            puzzleConfig: {
              type: "cipher",
              encryptedText: "WUDQ VIRUP",
              solutionText: "TRANSFORM",
              cipherHint: "提示：將每個字母往前移動 3 個位置 (W -> T, U -> R, D -> A...)",
            },
            endingHook:
              "『TRANSFORM』(改變/轉化)！文字迸發出金色的光芒，折疊城市前方亮起了第二扇門！",
            unlockedClueItem: "高中課本的信紙",
          },
          {
            id: 3,
            volumeId: 1,
            chapterId: 101,
            title: "父親的輪迴陰影",
            subtitle: "平行宇宙邏輯辨析",
            staminaCost: 15,
            coinReward: 150,
            clientName: "成年王小文",
            narrative:
              "第二扇門後是無數個重複的日曆與打卡鐘。三個平行宇宙的可華正站在岔路口，只有理解『真正的選擇不是逃避，而是面對』的人才是真正的可華。",
            openingDialogue: [
              {
                speaker: "成年王小文",
                text: "「你看，這三個人影都以為自己選擇了改變，但其中兩人只是掉進了另一個看似自由的輪迴。」",
                portrait: "charlotte",
              },
              {
                speaker: "可華",
                text: "「讓我根據他們的行動邏輯來找出那條能打破困局的路！」",
                portrait: "detective",
              },
            ],
            puzzleConfig: {
              type: "logic",
              clues: [
                "人影 A：每天抱怨工作無聊，但下班後依然機械性地刷手機到半夜，重複昨天的生活。",
                "人影 B：盲目跟風離職，卻沒有目標，最後再次陷入焦慮並回到了同一家公司。",
                "人影 C：認清自己的興趣與恐懼，開始每天積累能力，主動主導自己的人生抉擇。",
                "核心評判：真正打破人生輪迴的，是擁有明確目標並付出實踐的主動抉擇！",
              ],
              options: [
                {
                  id: "c",
                  label: "人影 C (突破輪迴者)",
                  isCorrect: true,
                  explanation:
                    "正確！主動設定目標並付諸實踐，才是擺脫平庸輪迴、開啟自主命運的唯一答案！",
                },
                {
                  id: "a",
                  label: "人影 A",
                  isCorrect: false,
                  explanation: "錯誤。人影 A 只是口頭抱怨，行為依然在輪迴中。",
                },
                {
                  id: "b",
                  label: "人影 B",
                  isCorrect: false,
                  explanation: "錯誤。盲目逃避並不能解決問題，終將回到原點。",
                },
              ],
            },
            endingHook:
              "人影 C 散發出光芒並與可華融合，可華內心的迷惘消散了大半，第三扇門的鎖扣應聲解開！",
            unlockedClueItem: "父親舊懷錶的碎片",
          },
          {
            id: 4,
            volumeId: 1,
            chapterId: 101,
            title: "折疊城市的訊號",
            subtitle: "3 位數多重宇宙密碼",
            staminaCost: 15,
            coinReward: 180,
            clientName: "成年王小文",
            narrative:
              "兩人來到折疊大樓的頂樓天台，前方是通往後面關卡的樞紐轉盤。需要透過 3 位數試探解開這個控制著 5 扇門的維度鎖。",
            openingDialogue: [
              {
                speaker: "成年王小文",
                text: "「前方就是那 5 扇關卡之門，穿過它們，我們才能回到真正的現實。準備好了嗎？」",
                portrait: "charlotte",
              },
            ],
            puzzleConfig: {
              type: "1a2b",
              digitsCount: 3,
              secretNumber: "715",
            },
            endingHook:
              "樞紐轉盤轟鳴響起，5 扇發光的星空之門在可華面前一字排開！\n\n【密碼彩蛋】7-1-5：天台上 7 道彩虹光束匯聚成 1 條唯一的通道，指向前方懸浮的 5 扇門——那是通往五道門的座標。",
            unlockedClueItem: "折疊城市的星圖",
          },
          {
            id: 5,
            volumeId: 1,
            chapterId: 101,
            title: "五扇門的終極抉擇",
            subtitle: "4 位數極限宇宙密碼",
            staminaCost: 20,
            coinReward: 250,
            clientName: "未來的可華",
            narrative:
              "進入第 0 篇的最終關卡，面前是通往未來 5 個可能性的總樞紐鎖。只有推算出正確的 4 位數頻率，才能成功打開前往下一篇章的通道！",
            openingDialogue: [
              {
                speaker: "成年王小文",
                text: "「這是第 0 篇的終點，也是你人生探索的起點。勇敢做出你的選擇吧，可華！」",
                portrait: "charlotte",
              },
              {
                speaker: "可華",
                text: "「我不再逃避了！不管前方有多少未知，我都願意去探索！」",
                portrait: "detective",
              },
            ],
            puzzleConfig: {
              type: "1a2b",
              digitsCount: 4,
              secretNumber: "3904",
            },
            endingHook:
              "光芒萬丈！5 扇門同時綻放出耀眼的金光，可華與王小文邁向了全新的生命篇章...\n\n【密碼彩蛋】3-9-0-4：已穿越 3 道虛幻門中殘影，眼前是象徵無限可能的 9 重宇宙，可華選擇讓一切 0 歸零重來，只花了 4 秒鐘就做出決定——那是「歸零重來」的瞬間。",
            unlockedClueItem: "多重宇宙徽章",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "五道門：生命教育的五把鑰匙",
    subtitle: "穿越五道門，找回真正的自己",
    summary:
      "穿過折疊城市後，可華與小文正式站在五扇巨大鑰匙門前。每一道門背後都盤據著一種『迷惘化身』——牠們是思考的謬誤、認同的混亂、抉擇的兩難、時間的恐懼，以及紛擾的雜念。看清一種迷惘，就等於為自己的心靈多點亮一盞燈。",
    coverBadge: "五門篇章",
    chapters: [
      {
        id: 201,
        volumeId: 2,
        title: "第一章：五把開啟幸福之門的鑰匙",
        subtitle: "追求真理・認識自己・正確抉擇・創造意義・圓滿生命",
        levels: [
          {
            id: 6,
            volumeId: 2,
            chapterId: 201,
            title: "消失的邏輯",
            subtitle: "【第一道門】追求真理",
            staminaCost: 20,
            coinReward: 300,
            clientName: "小文",
            narrative: "這道門的案件內容正在製作中，敬請期待。",
            openingDialogue: [],
            puzzleConfig: {
              type: "logic",
              clues: ["這道門的謎題正在製作中，敬請期待。"],
              options: [
                {
                  id: "placeholder",
                  label: "敬請期待",
                  isCorrect: true,
                  explanation: "這道門的內容正在製作中。",
                },
              ],
            },
            endingHook: "敬請期待。",
            unlockedClueItem: undefined,
            comingSoon: true,
          },
          {
            id: 7,
            volumeId: 2,
            chapterId: 201,
            title: "鏡中的陌生人",
            subtitle: "【第二道門】認識自己",
            staminaCost: 20,
            coinReward: 320,
            clientName: "小文",
            narrative: "這道門的案件內容正在製作中，敬請期待。",
            openingDialogue: [],
            puzzleConfig: {
              type: "logic",
              clues: ["這道門的謎題正在製作中，敬請期待。"],
              options: [
                {
                  id: "placeholder",
                  label: "敬請期待",
                  isCorrect: true,
                  explanation: "這道門的內容正在製作中。",
                },
              ],
            },
            endingHook: "敬請期待。",
            unlockedClueItem: undefined,
            comingSoon: true,
          },
          {
            id: 8,
            volumeId: 2,
            chapterId: 201,
            title: "天秤上的謊言",
            subtitle: "【第三道門】正確抉擇",
            staminaCost: 20,
            coinReward: 340,
            clientName: "小文",
            narrative: "這道門的案件內容正在製作中，敬請期待。",
            openingDialogue: [],
            puzzleConfig: {
              type: "logic",
              clues: ["這道門的謎題正在製作中，敬請期待。"],
              options: [
                {
                  id: "placeholder",
                  label: "敬請期待",
                  isCorrect: true,
                  explanation: "這道門的內容正在製作中。",
                },
              ],
            },
            endingHook: "敬請期待。",
            unlockedClueItem: undefined,
            comingSoon: true,
          },
          {
            id: 9,
            volumeId: 2,
            chapterId: 201,
            title: "時鐘裡的沙漏人",
            subtitle: "【第四道門】創造意義",
            staminaCost: 25,
            coinReward: 380,
            clientName: "小文",
            narrative: "這道門的案件內容正在製作中，敬請期待。",
            openingDialogue: [],
            puzzleConfig: {
              type: "logic",
              clues: ["這道門的謎題正在製作中，敬請期待。"],
              options: [
                {
                  id: "placeholder",
                  label: "敬請期待",
                  isCorrect: true,
                  explanation: "這道門的內容正在製作中。",
                },
              ],
            },
            endingHook: "敬請期待。",
            unlockedClueItem: undefined,
            comingSoon: true,
          },
          {
            id: 10,
            volumeId: 2,
            chapterId: 201,
            title: "風暴中心的寂靜",
            subtitle: "【第五道門】圓滿生命",
            staminaCost: 25,
            coinReward: 400,
            clientName: "小文",
            narrative: "這道門的案件內容正在製作中，敬請期待。",
            openingDialogue: [],
            puzzleConfig: {
              type: "logic",
              clues: ["這道門的謎題正在製作中，敬請期待。"],
              options: [
                {
                  id: "placeholder",
                  label: "敬請期待",
                  isCorrect: true,
                  explanation: "這道門的內容正在製作中。",
                },
              ],
            },
            endingHook: "敬請期待。",
            unlockedClueItem: undefined,
            comingSoon: true,
          },
        ],
      },
    ],
  },
];

export const DAILY_QUESTS: QuestItem[] = [
  {
    id: "q1",
    title: "探索初試身手",
    desc: "順利通過 1 道門的考驗",
    rewardCoins: 100,
    rewardStamina: 30,
    requiredCompletedCount: 1,
  },
  {
    id: "q2",
    title: "打破輪迴宿命",
    desc: "順利通過 3 道門的考驗",
    rewardCoins: 250,
    rewardStamina: 50,
    requiredCompletedCount: 3,
  },
  {
    id: "q3",
    title: "五門事務所大師",
    desc: "順利通過 5 道門的考驗，拿齊五把鑰匙",
    rewardCoins: 500,
    rewardStamina: 100,
    requiredCompletedCount: 5,
  },
];
