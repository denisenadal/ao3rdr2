import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RouteData, type Panel } from "../../lib/navigation.ts";
import type { settingsData } from "../Panel/Settings/settingTypes.ts"

import MenuPanel from "../Panel"
import Icon from "../Icon.tsx"

import "./header.css"

interface headerProps {
    settings: settingsData,
    updateSettings: (updatedSettings: settingsData) => void
}

function Header({ settings, updateSettings }: headerProps) {
    let location = useLocation();
    let routeItem = RouteData.find((r) => { return r.path === location.pathname });
    const [activePanel, setPanel] = useState<Panel>("none");

    return (
        <header className="navbar">
            <div className="container grid-xxl">
                <section className="navbar-brand">
                    <Link to="/"><h1 className="m-0">AO3rdr2</h1></Link>
                    <p className="m-0">{routeItem?.label}</p>
                </section>
                <span className="column spacer"></span>
                <section className="navbar-menu">
                    <button className="off- canvas-toggle btn btn-action s-circle btn-primary btn-ghost" onClick={() => { setPanel("menu") }}>
                        <Icon name="menu" size={16} />
                        <p className="m-0 text-assistive">menu</p>
                    </button>
                </section>
                <MenuPanel activePanel={activePanel} setPanel={setPanel} settings={settings} updateSettings={updateSettings} />
            </div>
        </header>
    );
}

export default Header;