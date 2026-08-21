import { stringToArray } from "../../../lib/format"
import { getFicUrl, isUnknown, formatTagLabel } from "../ficFormatters"
import type { LinkType } from "../ficTypes"

interface ficLinkProps {
    items: string | string[];
    ao3id: number | null;
    linkType: LinkType;
    className?: string;
    style?: React.CSSProperties;
}

const FicLinks = ({ linkType, items, ao3id, className, style }: ficLinkProps) => {
    if (!items) { return }
    let itemArray = [];
    //then it is a title
    if (typeof items === "string") {
        itemArray = linkType === "work" ? [items] : stringToArray(items)
    }
    else {
        itemArray = [...items]
    }

    return (
        <div className={linkType + "-list link-list " + className} style={style}>
            {itemArray.map(item => {
                if (!item) { return (<span className="empty"></span>) }
                return isUnknown(linkType, item) ?
                    <div key={item} className="link-item">{item}</div> :
                    <a key={item} className="link-item" href={getFicUrl(linkType, item, ao3id)} >{formatTagLabel(item)}</a>
            })}
        </div>)
}




export default FicLinks