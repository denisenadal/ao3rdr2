import { DateTime } from "luxon";

const stringToArray = (str: string) => {
    let arr;
    if (str.includes(",")) {
        arr = str.split(",")
    }
    else {
        arr = [str]
    }
    return arr;
}

const capitalize =(str:string)=>{
    let first = str[0]
    let rest = str.slice(1)
    return first.toUpperCase() + rest.toLowerCase()
}

const formatDate = (ts: number | string, format: string) => {
    let dt = typeof ts === "string" ? parseInt(ts) : ts;
    let z = Intl.DateTimeFormat().resolvedOptions().timeZone
    let d = DateTime.fromISO(dt.toString(), { zone: z });
    let d2="";
    switch (format) {
        case "ShortDate":
            d2 = d.toFormat('M/d/yy')
            break;
        case "MedDate":
            d2 = d.toFormat('D t')
            break;
        case "LongDate":
            d2 = d.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY); 
            break;
        case "XLDate":
            d2 = d.toLocaleString(DateTime.DATETIME_FULL); 
            break;
    }
    d2 = d2.replace(/,? 12:00 AM/,"")
    return d2
}

export {stringToArray, capitalize,  formatDate }