import type { ReactNode, MouseEvent } from 'react'
import type { colorScheme, buttonVariant } from "../../types/theme"
import "./shared.css"

interface buttonProps {
    children: string | ReactNode,
    color?: colorScheme,
    variant?: buttonVariant,
    onClick: () => void
}
const Button = ({ children, color = "primary", variant = "solid", onClick }: buttonProps) => {
    function clickHandler(e: MouseEvent) {
        onClick();
    }
    if(variant === "solid" || variant === "outline"){
        return (
            <button className={"btn btn-" + (variant === "outline" ? "outline-":"") + color} onClick={clickHandler}>{children}</button>
        )
    }
    return (
        <button className={"btn btn-" + color +" btn-"+variant} onClick={clickHandler}>{children}</button>
    )
}

export default Button