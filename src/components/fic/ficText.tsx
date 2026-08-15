import { tsToLongString, tsToMedString} from "../../lib/format"

type textType = "LongDate"| 
"MedDate" | "ShortDate" | "WordCount" | "EstTime" | "Summary" | "Notes"
interface ficTextProps{
textType: textType,
text: string|number,
}
function FicText({textType="Summary",text="",}:ficTextProps){
    let num = typeof text === "string" ? parseInt(text) : text;
    switch(textType){
        case "LongDate":
            return tsToLongString(num)
        case "MedDate":
            return tsToMedString(num)
        case "WordCount":
            return  !Number.isNaN(num) ?  num.toLocaleString() : text
        case "EstTime":
            return !Number.isNaN(num) ?  `${Math.round(num/250)}m` : "?"
        default:
            return text
    }
}


export default FicText