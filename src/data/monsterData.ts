import { MonsterData } from "../types";

// 迷惘化身：日常生活中散落的大大小小迷惘，追蹤並看清牠們，
// 是持續練習思辨與自我覺察的方式。
export const MONSTERS: MonsterData[] = [
  {
    id: "sophist_doll",
    name: "詭辯人偶",
    englishName: "Sophist Doll",
    description: "總是自相矛盾、卻堅信自己絕對正確的迷惘化身，擅長用似是而非的推論迷惑人心。",
    theme: "追求真理",
    digitsCount: 3,
  },
  {
    id: "mirror_shade",
    name: "鏡影怪",
    englishName: "Mirror Shade",
    description: "會模仿靠近牠的人，讓人分不清『真正的自己』和『別人期待的自己』。",
    theme: "認識自己",
    digitsCount: 3,
  },
  {
    id: "skewed_scale",
    name: "失衡天秤獸",
    englishName: "Skewed Scale Beast",
    description: "總是用非黑即白的方式逼迫路人做選擇，卻從不讓人看清選擇背後的價值衝突。",
    theme: "正確抉擇",
    digitsCount: 3,
  },
  {
    id: "hourglass_wraith",
    name: "沙漏人",
    englishName: "Hourglass Wraith",
    description: "不斷提醒靠近牠的人「時間所剩不多」，讓人陷入恐懼而逃避。",
    theme: "創造意義",
    digitsCount: 4,
  },
  {
    id: "static_storm",
    name: "雜念風暴",
    englishName: "Static Storm",
    description: "喧鬧紛亂的雜念具象化，唯有沉穩專注才能讓風暴逐漸平息。",
    theme: "圓滿生命",
    digitsCount: 4,
  },
  {
    id: "comparison_ghost",
    name: "比較幽靈",
    englishName: "Comparison Ghost",
    description: "總愛在你耳邊細語「別人比你更好」，讓你忘記自己的步調。",
    theme: "日常迷惘",
    digitsCount: 3,
  },
  {
    id: "procrastination_slime",
    name: "拖延史萊姆",
    englishName: "Procrastination Slime",
    description: "軟綿綿地黏在你身上，讓「明天再做」變成口頭禪。",
    theme: "日常迷惘",
    digitsCount: 3,
  },
];

export function getRandomMonster(excludeIds: string[] = []): MonsterData {
  const pool = MONSTERS.filter((m) => !excludeIds.includes(m.id));
  const list = pool.length > 0 ? pool : MONSTERS;
  return list[Math.floor(Math.random() * list.length)];
}
