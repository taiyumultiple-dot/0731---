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
              "車上的可華思考著自己是否會變成和父親一樣，在半夢半醒間，突然一陣強光籠罩──可華睜眼，發現自己在光怪陸離的「媽的多重宇宙」風格內容中穿梭掉落，最後掉在辦公桌前、同事叫他起來工作──可華發現自己已經變成中年大人模樣，驚慌失措！突然電腦螢幕跳出視窗傳來一個檔案：「探索，YES/NO」。當滑鼠放上 YES，四周閃動電腦 BUG GLITCH，門中走出了長大後的王小文...",
            openingDialogue: [
              {
                speaker: "同事",
                text: "「可華！別發呆了，這份季報今天下班前必須交出來，不然你這輩子就跟你爸一樣困在這個格子間吧！」",
                portrait: "doctor",
              },
              {
                speaker: "可華 (驚慌)",
                text: "「等等...我明明還是高中生啊！我根本不知道你在說什麼，這裡到底是哪裡？！」",
                portrait: "detective",
              },
              {
                speaker: "神秘通話者 (電腦螢幕)",
                text: "「冷靜。你真的想要改變這一切嗎？如果是，請輸入這台終端機的 3 位數解鎖密碼，開啟探索。」",
                portrait: "suspect",
              },
              {
                speaker: "成年王小文 (神秘女子)",
                text: "「想逃出去的話，跟我走。有問題，後面再說。」",
                portrait: "charlotte",
              },
            ],
            puzzleConfig: {
              type: "1a2b",
              digitsCount: 3,
              secretNumber: "482",
            },
            endingHook:
              "四周像是電腦 BUG GLITCH 一樣閃動！YES 門大開，成年王小文牽著可華的手邁入門中，門後竟然是如《全面啟動》般折疊高聳的大樓群！",
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
              "樞紐轉盤轟鳴響起，5 扇發光的星空之門在可華面前一字排開！",
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
              "光芒萬丈！5 扇門同時綻放出耀眼的金光，可華與王小文邁向了全新的生命篇章...",
            unlockedClueItem: "多重宇宙徽章",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "第1篇：平行世界的交會",
    subtitle: "重構高中記憶與夢想的形狀",
    summary:
      "穿過第一扇門後，可華與王小文來到了一個停滯在高中畢業典禮當天的平行世界。這裡每個人都戴著符合社會期待的面具，可華必須找回真正的夢想才能破局...",
    coverBadge: "進階篇章",
    chapters: [
      {
        id: 201,
        volumeId: 2,
        title: "第一章：面具與夢想",
        subtitle: "畢業典禮上的真相",
        levels: [
          {
            id: 6,
            volumeId: 2,
            chapterId: 201,
            title: "面具下的告白",
            subtitle: "平行宇宙邏輯辨析",
            staminaCost: 20,
            coinReward: 300,
            clientName: "高中王小文",
            narrative:
              "畢業典禮禮堂內，所有學生都在照著既定劇本宣誓。只有可華發現禮堂後方的時間停滯了，他需要辨識出哪一位同班同學是真心想追求夢想。",
            openingDialogue: [
              {
                speaker: "高中王小文",
                text: "「可華，大家都在說要做個穩定成功的大人，但你還記得我們當初說好的夢想嗎？」",
                portrait: "client",
              },
              {
                speaker: "成年王小文",
                text: "「這個世界會用『為你好』來磨平你的稜角，但只有你自己能選擇是否保持熾熱。」",
                portrait: "charlotte",
              },
            ],
            puzzleConfig: {
              type: "logic",
              clues: [
                "同學 A：說著最宏大的抱負，但只是為了獲得家長的誇獎與認同。",
                "同学 B：私下偷偷練習繪畫直到深夜，即便沒有人看好依然堅持不懈。",
                "同學 C：聽從安排選擇熱門科系，但眼神中充滿了茫然與倦怠。",
                "真實價值：真正的熱情不需要別人的掌聲，而是在孤獨中依然閃光的堅持！",
              ],
              options: [
                {
                  id: "b",
                  label: "同學 B (堅守夢想者)",
                  isCorrect: true,
                  explanation: "正確！出於內心真愛的堅持，才是支撐生命的真正力量！",
                },
                {
                  id: "a",
                  label: "同學 A",
                  isCorrect: false,
                  explanation: "錯誤。同學 A 只是為了滿足他人的期待。",
                },
                {
                  id: "c",
                  label: "同學 C",
                  isCorrect: false,
                  explanation: "錯誤。同學 C 已失去了對未來的自主權。",
                },
              ],
            },
            endingHook:
              "時間重新流動！禮堂外的星空展現出絕美的光芒，通往第 7 關的通道開啟了。",
            unlockedClueItem: "高中畢業合照",
          },
          {
            id: 7,
            volumeId: 2,
            chapterId: 201,
            title: "時空門的解鎖",
            subtitle: "4 位數極限宇宙密碼",
            staminaCost: 25,
            coinReward: 350,
            clientName: "成年王小文",
            narrative:
              "面對第二扇門的巨大時間鎖，需要透過 4 位數密碼破譯出這個宇宙的時間頻率。",
            openingDialogue: [
              {
                speaker: "成年王小文",
                text: "「這是第 1 篇的最後鎖扣，加油，可華！」",
                portrait: "charlotte",
              },
            ],
            puzzleConfig: {
              type: "1a2b",
              digitsCount: 4,
              secretNumber: "6281",
            },
            endingHook:
              "門鎖解開！兩人攜手步入了更深層的多重宇宙世界...",
            unlockedClueItem: "平行宇宙鑰匙卡",
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
    desc: "順利破解 1 個多重宇宙篇章關卡",
    rewardCoins: 100,
    rewardStamina: 30,
    requiredCompletedCount: 1,
  },
  {
    id: "q2",
    title: "打破輪迴宿命",
    desc: "順利破解 3 個多重宇宙篇章關卡",
    rewardCoins: 250,
    rewardStamina: 50,
    requiredCompletedCount: 3,
  },
  {
    id: "q3",
    title: "人生探索所大師",
    desc: "順利破解 5 個多重宇宙篇章關卡",
    rewardCoins: 500,
    rewardStamina: 100,
    requiredCompletedCount: 5,
  },
];
