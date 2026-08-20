import { NavLink } from "react-router-dom";
import { type Panel} from "../../lib/navigation.ts"
import Icon from "../Icon.tsx"

import "./menu.css"

interface menuProps{
    onClose: (nextPanel?:Panel)=> void
    active: boolean
}

function Menu({active,onClose}:menuProps){
    return <>
          <nav className="off-canvas">
            <button className="off-canvas-toggle btn btn-action s-circle btn-primary btn-ghost" onClick={()=>{onClose(active? "none" : "menu")}}>
                <Icon name="menu" size={16} />
                <p className="m-0 text-assistive">menu</p>
            </button>
            <ul id="sidebar-id" className={"off-canvas-sidebar bg-background "+(active ? "active":"")} >
                <li className="nav-item-wrapper">
                    <NavLink to="/" className="nav-item" >
                    <Icon name="home" size={16} /> Home</NavLink>
                </li>
                <li className="nav-item-wrapper">
                    <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault; e.stopPropagation();  e.nativeEvent.stopImmediatePropagation();if(onClose)onClose("settings")}}>
                    <Icon name="settings" size={16} /> Settings
                    </a>
                </li>
                <li className="nav-item-wrapper">
                    <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault; e.stopPropagation();  e.nativeEvent.stopImmediatePropagation();if(onClose)onClose("backup")}}>
                    <Icon name="backup" size={16} /> Backup
                    </a>
                </li>
                <li className="nav-item-wrapper">
                    <a href="https://archiveofourown.org" className="nav-item" >
                    <img src="images/ao3_logo_42.png" alt="AO3 logo"  width="20" />
                    Go to AO3</a>
                </li>
            </ul>
        </nav>
        </>
}

export default Menu;