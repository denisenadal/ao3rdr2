import type { ReactNode, MouseEvent } from 'react'
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
    function clickHandler(e: MouseEvent) {
        onClick();
    }
    if(variant === "solid" || variant === "outline"){
        return (
            <button className={"btn btn-" + (variant === "outline" ? "outline-":"") + color+" "+className} style={style} onClick={clickHandler}>{label}</button>
        )
    }
    return (
        <button className={"btn btn-" + color +" btn-"+variant+" "+className} style={style}  onClick={clickHandler}>{label}</button>
    )
}

export default Button