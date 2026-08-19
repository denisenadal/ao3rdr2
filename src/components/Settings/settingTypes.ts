import {type colorMode} from "../../types/theme.ts"
export type settingsData = {
    ao3: {
        filterBlockedTags: boolean,
        hideDislikes: boolean,
    },
    rdr: {
        hideDislikes: boolean,
        filterBlockedTags: boolean, //notactually used tho
    },
    user_id: string,
    blockedTags: string[],
    colorMode: colorMode

}