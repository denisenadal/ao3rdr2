import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {RouteData, type Panel }from "../../lib/navigation.ts";
import type {settingsData} from "../../components/Settings/settingTypes.ts"

import Menu from "./Menu.tsx"
import Settings from "../Settings/index.tsx"
import "./header.css"

interface headerProps{
    settings: settingsData,
    updateSettings:(updatedSettings:settingsData)=> void
  }
  
  function Header({settings, updateSettings}:headerProps) { 
    let location = useLocation();
    let routeItem = RouteData.find((r)=>{return r.path === location.pathname});
    const [activePanel, togglePanels] = useState("none");

    function handleClose(nextPanel?:Panel){
        togglePanels(nextPanel? nextPanel : "none")
    }

    return (
    <header className="navbar">
        <div className="container grid-xxl">
            <div className="navbar-brand">
                <Link to="/"><h1 className="m-0">AO3rdr2</h1></Link>
                <p className="m-0">{routeItem?.label }</p>
            </div>
            <Menu active={activePanel === "menu"}  onClose={handleClose} />
            <Settings settings={settings}  active={activePanel === "settings"}  onClose={handleClose} updateSettings={updateSettings}/>
        </div>
    </header>
);}

export default Header;