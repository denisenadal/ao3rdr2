import { stringToArray } from "../../../lib/format"
import { getFicUrl, isUnknown } from "../ficFormatters"
import  type {LinkType} from "../ficTypes"

interface ficLinkProps {
    items: string | string[];
    ao3id: number | null;
    linkType: LinkType;
}

const  FicLinks=({linkType, items,ao3id}:ficLinkProps) =>{
    if(!items){ return}
    let itemArray=[];
    //then it is a title
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
                    <div key={label} className="link-item">{label}</div> :
                    <a key={label} className="link-item" href={getFicUrl(linkType, label, ao3id)} >{label}</a>
            })}
        </div>)
}




export default FicLinks