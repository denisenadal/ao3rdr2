import { formatDate, stringToArray} from "../../lib/format"
import type { Fic } from "./ficTypes.ts";

const isUnread = (data:Fic)=>{
    // if(data.read && data.chapters_published){
    //     return data.read < data.chapters_published;
    // }
    // else{
    //     return data.rating == 0;
    // }
}
const formatTagUrl = (tagName: string) => {
    tagName = tagName.replaceAll("/", "*s*");
    tagName = tagName.replaceAll(".", "*d*");
    return tagName
}
const formatTagLabel = function (label: string) {
    label = label.trim();
    let old = label;
    label = label.replace("天官赐福 - 墨香铜臭 | Tiān Guān Cì Fú - Mòxiāng Tóngxiù", "Heaven's Official Blessing")
    label = label.replace("魔道祖师 - 墨香铜臭 | Módào Zǔshī - Mòxiāng Tóngxiù", "Grandmaster of Demonic Cultivation")
    label = label.replace("人渣反派自救系统 - 墨香铜臭 | The Scum Villain's Self-Saving System - Mòxiāng Tóngxiù", "Scum Villian")
    label = label.replace(/[^\x00-\x7F]/g, "")
    label = label.trim();
    while (label.charAt(0) == "|") {
        label = label.substring(2);
    }
    label = label.replace("JoJono Kimyou na Bouken | ", "")
    label = label.replaceAll(/\(.+\)/g, "")
    label = label.replaceAll(/ \| [a-z,A-Z ]+/g, "")
    label = label.replace(/ - .+/, "")
    label = label.trim();
    if (label.length < 1) {
        return old
    }
    return label
};
function getEstTime(words:number,separateHours:boolean): [number, number]{
    const readingSpeed = 238;
    const totalMinutes = words/readingSpeed;
    if(separateHours){
        return [
            Math.floor(totalMinutes / 60), 
            (Math.floor(totalMinutes % 60) || 1)
        ]
    }
    
    return [0,totalMinutes]
}
function formatFicText(textType="Summary", data:number|string){
    if(typeof data !== "number" && typeof data !== "string"){
        return data
    }
    let num = typeof data === "string" ? parseInt(data) : data;
    if(textType.includes("Date")){
        return formatDate(num,textType)
    }
    else if(textType === "WordCount"){
        return  !Number.isNaN(num) ?  num.toLocaleString() : data
    }
    else if(textType === "EstTime"){
        if(!Number.isNaN(num) ){
            const [hours,minutes] = getEstTime(num, true)
            const hStr = hours? hours+"h" : ""
            const  mStr = minutes? minutes+"m" : ""

            return hStr +" "+mStr
        }  
        return "?"
    }     
    return data
}


function getFicUrl(linkType:string, item:string, ao3id:number|null|string){
    if(linkType === "user" && item === "Anonymous"){
        return "";
    }
    let path = linkType === "work" ? ao3id : (linkType === "user"? item : formatTagUrl(item)+"/works" ) 

    return `https://archiveofourown.org/${linkType}s/${path}`
}

function isUnknown(linkType:string,val:string ){
    return val === "" ||val === "?" || linkType === "user" && val == "Anonymous" || linkType === "tag" && val == "..."
}
export {formatFicText, formatTagLabel, formatTagUrl, getFicUrl,getEstTime, isUnknown,}