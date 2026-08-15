import { formatDate} from "../../lib/format"

type textType = "XLDate"|"LongDate"| 
"MedDate" | "ShortDate" | "WordCount" | "EstTime" | "Summary" | "Generic"
interface ficTextProps{
textType: textType,
text: string|number,
}
function FicText({textType="Summary",text="",}:ficTextProps){
    let num = typeof text === "string" ? parseInt(text) : text;
    if(textType.includes("Date")){
        return formatDate(num,textType)
    }
    else if(textType === "WordCount"){
        return  !Number.isNaN(num) ?  num.toLocaleString() : text
    }
    else if(textType === "EstTime"){
        return !Number.isNaN(num) ?  `${Math.round(num/250)}m` : "?"
    }
       
    return text
}


export default FicText