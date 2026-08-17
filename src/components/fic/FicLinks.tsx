import { stringToArray } from "../../lib/format"
import { formatTagLabel, getFicUrl, isUnknown, type LinkType } from "./ficHelpers"

interface ficLinkProps {
    items: string | string[];
    ao3id: number | null;
    linkType: LinkType;
}

const  FicLinks=({linkType, items,ao3id}:ficLinkProps) =>{
    if(!items){ return}
    let itemArray=[];
    if(typeof items=== "string"){
        itemArray = linkType === "work" ? [items] : stringToArray(items)
    }
    else{
        itemArray = [...items]
    }
    
    return (
        <div className={linkType + "-list link-list"}>
            {itemArray.map(label => {
                if (!label) { return (<span className="empty"></span>)}
                return isUnknown(linkType, label) ?
                    <p>{label}</p> :
                    <a href={getFicUrl(linkType, label, ao3id)} >{label}</a>
            })}
        </div>)
}




export default FicLinks