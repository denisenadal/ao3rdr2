import type { ReactNode, MouseEvent } from 'react'
import type { colorScheme, buttonVariant } from "../../types/theme"
import type { Fic } from "../../types/fic.ts";

import Icon from "../../components/Icon"
import "./shared.css"
import "./tag.css"

interface tagProps {
  fic?:Fic,
  children: string ,
  color?: colorScheme,
  variant?: buttonVariant,
  size: "sm"|"md";
  className?: string;
  style?: React.CSSProperties;
  onRemove?: (e:MouseEvent,fic?:Fic) => void,
}

const Tag = ({ fic,children, color="primary", variant="muted", size = "md",className="", style,onRemove }: tagProps) => {
  const iconSize = size === "md" ? 16 : 12;
  return (
    <button type="button" className={"tag p-relative chip "+size+" btn-"+color+" btn-"+variant+" "+className} style={style} data-tag={children} onClick={(e:MouseEvent)=>{ if(onRemove){ onRemove(e, fic)} }}  >
      {children}
      <Icon className="btn-icon btn-close"  size={iconSize} name={"close"} />
    </button>
  )
}

export default Tag