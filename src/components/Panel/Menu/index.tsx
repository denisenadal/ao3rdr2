import { type MouseEvent } from "react"
import { useNavigate } from "react-router-dom"
import { type Panel } from "../../../lib/navigation.ts"
import Icon from "../../Icon.tsx"

import "./menu.css"

interface menuProps {
    onClose: (nextPanel: Panel) => void,
}

function Menu({ onClose }: menuProps) {
    const nav = useNavigate()
    function handleRouteClick(e: MouseEvent, route: string) {
        e.preventDefault;
        onClose("none")
        nav(route)
    }

    function handlePanelClick(e: MouseEvent, nextPanel: Panel) {
        e.preventDefault;
        onClose(nextPanel);

    }
    return <>
        <nav className={"main-menu"}>
            <ul className="nav nav-list">
                <a href="#" className="nav-item" onClick={(e) => { handleRouteClick(e, "/") }}>
                    <Icon name="home" size={16} /> Home
                </a>
                <li className="nav-item-wrapper">
                    <a href="#" className="nav-item" onClick={(e) => { handlePanelClick(e, "settings") }}>
                        <Icon name="settings" size={16} /> Settings
                    </a>
                </li>
                <li className="nav-item-wrapper">
                    <a href="#" className="nav-item" onClick={(e) => { handlePanelClick(e, "backup") }}>
                        <Icon name="backup" size={16} /> Backup
                    </a>
                </li>
                <li className="nav-item-wrapper">
                    <a href="#" className="nav-item" onClick={(e) => { handleRouteClick(e, "/about") }}>
                        <Icon name="home" size={16} /> About
                    </a>
                </li>
            </ul>
            <hr className="divider" />
            <ul className="nav nav-list">
                <li className="nav-item-wrapper">
                    <a href="https://archiveofourown.org" className="nav-item" >
                        <img src="images/ao3_logo_42.png" alt="AO3 logo" width="20" />
                        Go to AO3</a>
                </li>
            </ul>
        </nav>
    </>
}

export default Menu;