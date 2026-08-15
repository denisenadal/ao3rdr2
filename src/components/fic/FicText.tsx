import { formatDate} from "../../lib/format"

type textType = "XLDate"|"LongDate"| 
"MedDate" | "ShortDate" | "WordCount" | "EstTime" | "Summary" | "Generic"
interface ficTextProps{
textType: textType,
children: string|number,
}
function FicText({textType="Summary",children="",}:ficTextProps){
    let num = typeof children === "string" ? parseInt(children) : children;
    if(textType.includes("Date")){
        return formatDate(num,textType)
    }
    else if(textType === "WordCount"){
        return  !Number.isNaN(num) ?  num.toLocaleString() : children
    }
    else if(textType === "EstTime"){
        return !Number.isNaN(num) ?  `${Math.round(num/250)}m` : "?"
    }
       
    return children
}


export default FicText