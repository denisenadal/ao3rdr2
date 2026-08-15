import { DateTime } from "luxon";
import type { Fic } from "../types/fic";

const formatTagUrl = (tagName:string)=>{
    tagName = tagName.replaceAll("/","*s*");
    tagName = tagName.replaceAll(".","*d*");
    return tagName
}
const formatTagLabel = function(label:string){
    label = label.trim();
    let old = label;
    label = label.replace("天官赐福 - 墨香铜臭 | Tiān Guān Cì Fú - Mòxiāng Tóngxiù", "Heaven's Official Blessing")
    label = label.replace("魔道祖师 - 墨香铜臭 | Módào Zǔshī - Mòxiāng Tóngxiù", "Grandmaster of Demonic Cultivation")
    label = label.replace("人渣反派自救系统 - 墨香铜臭 | The Scum Villain's Self-Saving System - Mòxiāng Tóngxiù", "Scum Villian")
    label = label.replace(/[^\x00-\x7F]/g, "")
    label = label.trim();
    while (label.charAt(0) == "|"){
        label = label.substring(2);
    }
    label = label.replace("JoJono Kimyou na Bouken | ", "")
    label = label.replaceAll(/\(.+\)/g,"")
    label = label.replaceAll(/ \| [a-z,A-Z ]+/g,"")
    label = label.replace(/ - .+/,"")
    label = label.trim();
    if(label.length < 1){
        return old
    }
    return label
};
const stringToArray = (str:string)=>{
    let arr;
    if(str.includes(",") ){
        arr = str.split(",")
    }
    else{
        arr = [str]
    }
    return arr;
}
const tsToLongString = (ts:number|string)=>{
    let dt = typeof ts === "string" ? parseInt(ts) : ts;
    let z = Intl.DateTimeFormat().resolvedOptions().timeZone
    let d = DateTime.fromISO(dt.toString(), { zone: z });
    let d2 = d.toFormat('D t')
    return d2;
}

const tsToMedString =(ts:number|string)=>{
    let dt = typeof ts === "string" ? parseInt(ts) : ts;
    let z = Intl.DateTimeFormat().resolvedOptions().timeZone
    let d = DateTime.fromISO(dt.toString(), { zone: z });
    let d2 = d.toFormat('M/dd/yy')
    return d2;
}

const extractFilterOptions = (fics: Fic[], dataKey: keyof Fic)=>{
        const unique = new Set<string>();
        fics.forEach(fic => {
          const value = fic[dataKey];
          if (value) {
            // Handle arrays (like fandoms) or strings
            const values = Array.isArray(value) ? value : [value];
            values.forEach(v => unique.add(String(v)));
          }
        });
        
        return Array.from(unique).map(value => ({
          label: value,
          value: value
        }));
      }
export {formatTagUrl,formatTagLabel, stringToArray,tsToLongString, tsToMedString, extractFilterOptions}