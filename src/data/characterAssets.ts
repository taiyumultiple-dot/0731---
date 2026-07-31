/**
 * 角色圖片集中管理
 * ------------------------------------------------------------
 * 目前先用 /public/assets/characters/ 底下的 SVG 剪影佔位。
 *
 * 要換成真實插畫時，把檔案放進 public/assets/characters/，
 * 檔名維持一致（例如 wenwen.png），並把下面對應的路徑改成新檔名即可，
 * 不用改任何元件程式碼。
 *
 * 建議尺寸（直式構圖，人物置中偏上，方便各元件用 object-cover 裁切）：
 *  - WENWEN_BUST   小文半身/胸上像，用於卡片縮圖、對話框頭像　→ 建議 800x1000 px
 *  - WENWEN_FULL   小文全身或伸手邀請動作，用於 Hub / 五扇門大圖　→ 建議 1000x1400 px
 *  - KEHUA_OFFICE  可華坐辦公桌前驚慌樣，用於抉擇時刻 / 五扇門大圖　→ 建議 1200x1600 px
 *  - KEHUA_BUST    可華半身像，用於對話框頭像　→ 建議 800x1000 px
 *  - COLLEAGUE     同事（配角，第1關開場）　→ 建議 800x1000 px
 *  - MYSTERY_CALLER 神秘通話者（電腦視窗畫面，可用抽象/剪影風格）　→ 建議 800x1000 px
 */

export const CHARACTER_IMAGES = {
  WENWEN_BUST: "/assets/characters/wenwen.svg",
  WENWEN_FULL: "/assets/characters/wenwen.svg",
  KEHUA_OFFICE: "/assets/characters/kehua.svg",
  KEHUA_BUST: "/assets/characters/kehua.svg",
  COLLEAGUE: "/assets/characters/colleague.svg",
  MYSTERY_CALLER: "/assets/characters/mystery_caller.svg",
  // 場景背景（非角色特寫），建議尺寸 1600x1000 px 橫幅
  FOLDED_CITY: "/assets/characters/folded_city.svg",
} as const;
