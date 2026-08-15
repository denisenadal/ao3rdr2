import { formatTagLabel, formatTagUrl,stringToArray} from "../../lib/format"
type LinkType = "user" | "tags" | "work";

interface ficLinkProps {
  value: string|string[];
  ao3id: number | null;
  linkType: LinkType;
}

function FicLinks({value,ao3id,linkType}:ficLinkProps){
    let items = typeof value == "string" ?  stringToArray(value) : value
    return <>{
        items.map((item,i,arr)=>{
            let ending = i === arr.length - 1 ? "" : ", "
            let path = linkType === "work" ? ao3id : (linkType === "user"? item : formatTagUrl(item)+"/works" ) 
            let label = item;
            if(linkType !== "work"){
                label = formatTagLabel(item)
            }
            if(linkType === "user" && item == "Anonymous"){
                return "Anonymous"+ending
            }
            return <><a key={item} href={"https://archiveofourown.org/"+linkType+"/"+path} >{label}</a>{ending}</>
        })
    }</>
}



export default FicLinks