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
            subtitle: "【第一道門】追求真理・大前提-小前提-結論密碼鎖",
            staminaCost: 20,
            coinReward: 300,
            clientName: "小文",
            narrative:
              "在這道門後，有一個總是自相矛盾、卻認定自己絕對正確的『詭辯人偶』。它會用似是而非的推論迷惑所有接近的人。可華，你能看穿它謬論中的破綻，推論出真正的邏輯嗎？詭辯人偶的核心藏著一組『大前提—小前提—結論』的密碼鎖，只有先識破它散布的謬論、再按照正確的邏輯推演順序輸入，才能拆解它的詭辯迴路。",
            openingDialogue: [
              {
                speaker: "小文",
                text: "「詭辯人偶最擅長的，就是把似是而非的話說得理直氣壯。你要做的不是急著反駁，而是先看懂牠邏輯裡的破綻。」",
                portrait: "charlotte",
              },
              {
                speaker: "可華",
                text: "「大前提、小前提、結論……原來思考本身，也可以是一件很有樂趣的事。」",
                portrait: "detective",
              },
            ],
            puzzleConfig: {
              type: "syllogism",
              syllogismIntro:
                "詭辯人偶散布了兩句謬論混在真正的推論中。先點出並排除謬論，再依「大前提 → 小前提 → 結論」的順序，點選正確的推理鏈。",
              syllogismStatements: [
                {
                  id: "major",
                  role: "major",
                  text: "凡是願意「先檢驗前提是否為真、推論過程是否合理」才做判斷的人，都能看穿詭辯。",
                },
                {
                  id: "minor",
                  role: "minor",
                  text: "可華正在練習「先檢驗前提、才做判斷」的思考方式。",
                },
                {
                  id: "conclusion",
                  role: "conclusion",
                  text: "所以，可華能夠看穿詭辯人偶的謬誤。",
                },
                {
                  id: "fallacy1",
                  role: "fallacy",
                  fallacyName: "訴諸群眾",
                  text: "「大家都覺得這樣做對，所以這樣做一定對。」",
                },
                {
                  id: "fallacy2",
                  role: "fallacy",
                  fallacyName: "人身攻擊",
                  text: "「你敢反對我的說法，就代表你這個人有問題。」",
                },
              ],
            },
            endingHook:
              "詭辯人偶的核心密碼鎖應聲彈開，牠散布的謬論在邏輯的光芒中逐一崩解。小文微笑道：「你剛剛做的，就是課本裡說的『批判性思考』——不是急著反駁，而是先看懂對方邏輯裡的破綻。」可華恍然大悟：「原來思考本身，也可以是一件很有樂趣的事。」",
            unlockedClueItem: "詭辯人偶的核心齒輪",
          },
          {
            id: 7,
            volumeId: 2,
            chapterId: 201,
            title: "鏡中的陌生人",
            subtitle: "【第二道門】認識自己・自我認同密碼",
            staminaCost: 20,
            coinReward: 320,
            clientName: "小文",
            narrative:
              "這道門裡住著『鏡影怪』，牠會模仿靠近牠的人，讓對方分不清『真正的自己』和『別人期待的自己』哪一個才是真的。要打敗鏡影怪，你得先破解牠身上的『自我認同密碼』——每一次錯誤的猜測，鏡影怪就會換一張新的臉。",
            openingDialogue: [
              {
                speaker: "小文",
                text: "「你有沒有發現，你每一次猜的密碼，其實都是在回答『我是誰』這個問題？」",
                portrait: "charlotte",
              },
              {
                speaker: "可華",
                text: "「WUDQ VIRUP……這是我高中的字跡？認識自己，原來也需要不斷嘗試、不斷修正。」",
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
              "『TRANSFORM』(改變/轉化)！鏡影怪身上千百張模仿的臉孔逐一剝落，只留下可華自己真實的倒影。",
            unlockedClueItem: "鏡影怪的破碎鏡片",
          },
          {
            id: 8,
            volumeId: 2,
            chapterId: 201,
            title: "天秤上的謊言",
            subtitle: "【第三道門】正確抉擇・價值權重密碼",
            staminaCost: 20,
            coinReward: 340,
            clientName: "小文",
            narrative:
              "『失衡天秤獸』盤據在這道門後，牠總是用「非黑即白」的方式逼迫路人做選擇，卻從不讓人看清選擇背後真正的價值衝突。唯有還原天秤獸身上被打亂的『價值權重密碼』，讓天秤重新平衡，牠才會現出原形。",
            openingDialogue: [
              {
                speaker: "小文",
                text: "「生活裡有很多兩難的價值，其實沒有絕對正確的答案，只有『你願意承擔哪一種選擇的後果』。」",
                portrait: "charlotte",
              },
              {
                speaker: "可華",
                text: "「所以思辨，不是找標準答案，是學會為自己的選擇負責……讓我來找出天秤的平衡點！」",
                portrait: "detective",
              },
            ],
            puzzleConfig: {
              type: "balance",
              balanceIntro:
                "天秤獸打亂了『穩定』與『熱情』兩種人生考量的權重。點選卡片放上左右兩側，直到兩邊的權重總和相等。",
              balanceChips: [
                { id: "c1", label: "經濟保障：穩定收入帶來的安全感", weight: 5 },
                { id: "c2", label: "家人期待：不讓家人擔心的責任感", weight: 3 },
                { id: "c3", label: "社會眼光：符合「正常」人生的壓力", weight: 2 },
                { id: "c4", label: "自我實現：做自己真正喜歡的事", weight: 4 },
                { id: "c5", label: "成長空間：持續學習與挑戰自己", weight: 3 },
                { id: "c6", label: "熱情動力：每天醒來都想去做的事", weight: 3 },
              ],
            },
            endingHook:
              "天秤緩緩歸於平衡，失衡天秤獸發出一聲長嘯後化為光點消散。可華忽然明白：抉擇的重點從來不是對錯，而是願不願意承擔。",
            unlockedClueItem: "失衡天秤獸的秤砣",
          },
          {
            id: 9,
            volumeId: 2,
            chapterId: 201,
            title: "時鐘裡的沙漏人",
            subtitle: "【第四道門】創造意義・生命之謎密碼",
            staminaCost: 25,
            coinReward: 380,
            clientName: "小文",
            narrative:
              "這是五道門裡最沉重的一道。『沙漏人』會不斷提醒靠近牠的人「時間所剩不多」，許多人因此陷入恐懼而逃避，卻忘了正視生命有限這件事，才能真正活得踏實。沙漏人的密碼會隨著倒數時間縮短而變化，你必須在牠徹底歸零前，找出屬於你自己的『生命之謎密碼』。",
            openingDialogue: [
              {
                speaker: "小文",
                text: "「還記得可華在車上想的那句話嗎？『我會不會也變成這樣』——其實答案，從來都不是命定的。」",
                portrait: "charlotte",
              },
              {
                speaker: "可華",
                text: "「因為知道時間有限，所以更要想清楚，自己到底想怎麼活！」",
                portrait: "detective",
              },
            ],
            puzzleConfig: {
              type: "1a2b",
              digitsCount: 4,
              secretNumber: "7042",
            },
            endingHook:
              "沙漏裡的沙粒停止了墜落，沙漏人卸下了滿身的恐懼，化為溫柔的微光融入可華心中。\n\n【密碼彩蛋】7-0-4-2：渾噩過完一生大約是 70 個寒暑，但沙粒每次歸 0 都會重新翻轉——時間感只有兩種活法：4（四季流轉的踏實）或 2（逃避現實的空轉）。",
            unlockedClueItem: "沙漏人的靜止沙漏",
          },
          {
            id: 10,
            volumeId: 2,
            chapterId: 201,
            title: "風暴中心的寂靜",
            subtitle: "【第五道門】圓滿生命・冷靜推理",
            staminaCost: 25,
            coinReward: 400,
            clientName: "小文",
            narrative:
              "最後一道門裡沒有兇惡的怪獸，只有一片喧鬧的『雜念風暴』。你要做的不是攻擊，而是靜下心，在混亂中找到那個安靜的核心。雜念風暴不會主動攻擊，但每一次心浮氣躁的錯誤嘗試，都會讓風暴變得更大。唯有沉穩、專注地推理，才能讓風暴逐漸平息。",
            openingDialogue: [
              {
                speaker: "小文",
                text: "「五道門都走完了。可華，你發現了嗎？其實從頭到尾，真正的謎底一直都是你自己。」",
                portrait: "charlotte",
              },
              {
                speaker: "可華",
                text: "「所以『回家』的意思，不是回到過去，而是回到真正的自己。」",
                portrait: "detective",
              },
            ],
            puzzleConfig: {
              type: "logic",
              clues: [
                "念頭 A：「越想越亂，乾脆什麼都不要想了。」——逃避型雜念。",
                "念頭 B：「先深呼吸，把注意力放回眼前這一刻。」——專注當下的核心。",
                "念頭 C：「一定是我不夠好，才會這麼亂。」——自我否定型雜念。",
                "核心評判：真正讓風暴平息的，不是壓抑或苛責自己，而是溫柔而專注地回到當下！",
              ],
              options: [
                {
                  id: "b",
                  label: "念頭 B（專注當下）",
                  isCorrect: true,
                  explanation:
                    "正確！在混亂中找到安靜的核心，靠的不是逃避或自責，而是溫柔而專注地回到當下。",
                },
                {
                  id: "a",
                  label: "念頭 A（逃避型雜念）",
                  isCorrect: false,
                  explanation: "錯誤。逃避不會讓風暴平息，只會讓雜念持續累積。",
                },
                {
                  id: "c",
                  label: "念頭 C（自我否定型雜念）",
                  isCorrect: false,
                  explanation: "錯誤。苛責自己只會讓風暴變得更大，無法找回內心的平靜。",
                },
              ],
            },
            endingHook:
              "雜念風暴逐漸平息，五道門在身後緩緩閉合，光芒散去。小文微笑道：「恭喜你，可華。五把鑰匙，你都拿到了。」她接著說：「你一定會長大、會疲憊、會有低潮。但現在的你，已經知道怎麼問對的問題、怎麼認識自己、怎麼做出無悔的選擇、怎麼面對有限的時間，也知道怎麼在風暴中找回平靜。這五道門，不會消失，它們會一直在你心裡，你隨時可以再打開。」畫面漸亮，回到現實中的可華——依然是高中生，坐在父親的車上。可華望向窗外，微笑著說：「爸，我以後想成為，一個知道自己為什麼而活的人。」",
            unlockedClueItem: "五門事務所的畢業徽章",
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
