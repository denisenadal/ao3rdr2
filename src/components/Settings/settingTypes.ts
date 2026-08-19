import {type colorMode} from "../../types/theme.ts"
export type settingsData = {
    ao3: {
        autofilter: boolean,
        hideDislikes: boolean,
    },
    rdr: {
        autofilter: boolean,
        hideDislikes: boolean,
    },
    user_id: string,
    blockedTags: string[],
    colorMode: colorMode

}