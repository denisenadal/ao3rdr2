import { formatTagLabel, formatTagUrl,stringToArray} from "../../lib/format"
type LinkType = "user" | "tag" | "work";

interface ficLinkProps {
  value: string|string[];
  ao3id: number | null;
  linkType: LinkType;
}

function FicLinks({value,ao3id,linkType}:ficLinkProps){
    let items = typeof value == "string" ?  stringToArray(value) : value
    return <>{
        items.map((item,i,arr)=>{
            if(item === "..." || item === "" ){
                return item
            }
            let ending = i === arr.length - 1 ? "" : ", "
            let path = linkType === "work" ? ao3id : (linkType === "user"? item : formatTagUrl(item)+"/works" ) 
            let label = item;
            if(linkType !== "work"){
                label = formatTagLabel(item)
            }
            if(linkType === "user" && item == "Anonymous"){
                return "Anonymous"+ending
            }
            return <span key={item} style={{display:"contents"}}><a  href={"https://archiveofourown.org/"+linkType+"s/"+path} >{label}</a>{ending}</span>
        })
    }</>
}



export default FicLinks