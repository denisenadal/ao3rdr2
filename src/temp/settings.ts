import type {settingsData} from "../components/Settings/settingTypes.ts"

const defaultSettings = {
    "ao3": {
    "autofilter": true,
    "hideDislikes": true,
    },
    "rdr": {
    "autofilter": true,
    "hideDislikes": true,
    },
    "user_id": "080b7013-14b2-4fd8-be8b-f567db3cdb39",
    "colorMode":"system",
    "blockedTags": [
      "modern au",
      "coffeeshop",
      "Alternate Universe - High School",
      "coffee shop",
      "college au",
      "Podfic",
      "Omega Verse",
      "Mpreg"
    ]
  } as settingsData;
export default defaultSettings;