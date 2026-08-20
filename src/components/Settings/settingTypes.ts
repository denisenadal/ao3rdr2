import {type colorMode} from "../../types/theme.ts"
export type settingsData = {
    ao3_hideBlockedTags: boolean,
    ao3_hideDislikes: boolean,
    rdr_hideDislikes: boolean,
    userId: string,
    blockedTags: string[],
    colorMode: colorMode

}