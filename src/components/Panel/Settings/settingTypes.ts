import {type colorMode} from "../../../lib/theme.ts"
export type settingsData = {
    ao3_hideBlockedTags: boolean,
    ao3_hideDislikes: boolean,
    rdr_hideDislikes: boolean,
    userId: string,
    blockedTags: string[],
    colorMode: colorMode

}
export type fieldset ={
    "fieldname": field,
    "label": string 
}
export type field = "ao3_hideBlockedTags" | "ao3_hideDislikes" | "rdr_hideDislikes"