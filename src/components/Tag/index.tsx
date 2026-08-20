import type { MouseEvent } from 'react'
import type { colorScheme, buttonVariant } from "../../types/theme.ts"
import type { Fic, FicUpdate } from "../Fic/ficTypes.ts";

import Icon from "../Icon.tsx"
import "./tag.css"

interface tagProps {
  fic?:Fic,
  tag:string,
  color?: colorScheme,
  variant?: buttonVariant,
  size: "sm"|"md";
  className?: string;
  style?: React.CSSProperties;
  onRemove?: (update:FicUpdate|string) => void,
}

const Tag = ({ fic,tag,color="primary", variant="muted", size = "md",className="", style,onRemove }: tagProps) => {
  const iconSize = size === "md" ? 16 : 12;
  const disabledClass = !onRemove ? " disabled " : "";
  const label = tag;

  function handleClick(e:MouseEvent){
    e.preventDefault();
    const tag:string = (e.currentTarget as HTMLInputElement).value

    if(fic){
      if(!fic.personal_tags) return;
      const updatedTags = fic.personal_tags.filter(t=>{return t!==tag})
      const update = {"fic":fic, "update":{"personal_tags": updatedTags}}
  
      if(onRemove){ onRemove(update) }
    }
    else{
      if(onRemove){ onRemove(tag) }
    }
    
  }

  return (
    <button className={"tag p-relative chip "+size+" btn-"+color+" btn-"+variant+" "+className+disabledClass} style={style} value={tag} onClick={handleClick}   >
      {label}
      {onRemove ? <Icon className="btn-icon btn-close"  size={iconSize} name={"close"} /> : ""}
    </button>
  )
}

export default Tag