import React from "react"
import { type Panel } from "../../lib/navigation.ts"
import Icon from "../../components/Icon"


interface mProps {
    children: React.ReactNode,
    active: boolean,
    size: "sm" | "md"
    handleClose: (nextPanel: Panel) => void
}

const MenuPanel = ({ children, active, size, handleClose }: mProps) => {
    return (
        <aside className={"off-canvas rdr-menu-panel" + (active ? " active" : "")}>
            <div className={"off-canvas-sidebar bg-background " + size + "-panel " + (active ? " active" : "")} style={{ zIndex: 202 }}>
                <header className="columns">
                    <button className=" btn btn-ghost s-circle" aria-label="Close" onClick={() => { handleClose("none") }}>
                        <Icon name="close" size={18} className="close-modal btn-icon" />
                    </button>
                </header>
                {children}

            </div>
        </aside>
    )
}

export default MenuPanel