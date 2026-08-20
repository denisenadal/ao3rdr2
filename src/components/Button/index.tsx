import type { ReactNode } from 'react'
import type { colorScheme, buttonVariant } from "../../types/theme"
import "./shared.css"

interface buttonProps {
    label: string | ReactNode,
    color?: colorScheme,
    variant?: buttonVariant,
    className?: string;
    style?: React.CSSProperties;
    onClick: () => void
}
const Button = ({ label, color = "primary", variant = "solid", className="", style, onClick }: buttonProps) => {
    
    return (
        <button className={"btn btn-" + color +" btn-"+variant+" "+className} style={style}  onClick={()=>{onClick()}}>{label}</button>
    )
}

export default Button