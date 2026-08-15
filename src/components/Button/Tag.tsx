import type { ReactNode, MouseEvent } from 'react'
import type { colorScheme, buttonVariant } from "../../types/theme"
import Icon from "../../components/Icon"
import "./shared.css"
import "./tag.css"

interface tagProps {
  children: string | ReactNode,
  color?: colorScheme,
  variant?: buttonVariant,
  size: "sm"|"md";
  onRemove?: () => void,
  onClick?: () => void
}

const Tag = ({ children, color, variant, size = "md",onRemove, onClick }: tagProps) => {
  function clickHandler(e: MouseEvent) {
    if (onClick)
      onClick();
  }
  const iconSize = size === "md" ? 16 : 12;

  if (variant === "solid") {
    return (
      <div className={"tag position-relative "+size} >
        <button type="button" className={"badge rounded-pill btn"+ " btn-"+color} onClick={clickHandler} >{children}</button>
        {onRemove ? (<button type="button" className={"close text-bg-" + color } aria-label="Close" onClick={() => { onRemove() }}><Icon size={iconSize} name="close" /></button>) : ""}
      </div>
    )
  }
  return (
    <div className={"tag position-relative "+size} >
      <button type="button" className={"badge rounded-pill"+ " btn-" + variant+" btn-"+color} onClick={clickHandler}>{children}</button>
      {onRemove ? (
        <button type="button" className={"badge close"+ " btn-" + variant+" btn-"+color} aria-label="Close" onClick={() => { onRemove() }}><Icon size={iconSize} name="close" /></button>) 
        : ""}
    </div>
  )
}

export default Tag