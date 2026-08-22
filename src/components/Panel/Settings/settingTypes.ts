import {type colorMode} from "../../../lib/theme.ts"
export type settingsData = {
    ao3_hideBlockedTags?: boolean,
    ao3_hideDislikes?: boolean,
    rdr_hideDislikes?: boolean,
    rdr_rowsPerPage?: number,
    userId?: string,
    blockedTags?: string[],
    colorMode?: colorMode

}
export type fieldset ={
    "fieldname": field,
    "label": string 
}
export type field = "ao3_hideBlockedTags" | "ao3_hideDislikes" | "rdr_hideDislikes"


export const defaultSettings = {
    ao3_hideBlockedTags: true,
    ao3_hideDislikes: true,
    rdr_hideDislikes: true,
    rdr_rowsPerPage: 10,
    userId: "080b7013-14b2-4fd8-be8b-f567db3cdb39",
    colorMode:"system",
    blockedTags: []
  } as settingsData;

export const rowsPerOptions = [10,15,25,50,100]