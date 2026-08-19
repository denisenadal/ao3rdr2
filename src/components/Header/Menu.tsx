import { NavLink } from "react-router-dom";
import { RouteData, type Panel} from "../../lib/routes.ts"
import Icon from "../Icon"

interface menuProps{
    onClose: (nextPanel?:Panel)=> void
    active: boolean
}

function Menu({active,onClose}:menuProps){
    return <>
          <nav className="off-canvas">
            <button className="off-canvas-toggle btn btn-action s-circle btn-primary btn-ghost p-1" onClick={()=>{onClose(active? "none" : "menu")}}>
                <Icon name="menu" size={16} />
                <p className="m-0 text-assistive">menu</p>
            </button>
            <ul id="sidebar-id" className={"off-canvas-sidebar bg-background "+(active ? "active":"")} >
                <li className="nav-item-wrapper">
                    <NavLink to="/" className="nav-item" >
                    <Icon name="home" size={16} /> Home</NavLink>
                </li>
                <li className="nav-item-wrapper">
                    <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault;if(onClose)onClose("settings")}}>
                    <Icon name="settings" size={16} /> Settings
                    </a>
                </li>
                <li className="nav-item-wrapper">
                    <NavLink to="backup" className="nav-item" > <Icon name="backup" size={16} /> Backup</NavLink>
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