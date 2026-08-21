import { type Panel } from "../../lib/navigation.ts"
import Icon from "../../components/Icon"
import type { settingsData } from "../Panel/Settings/settingTypes.ts"
import Settings from "./Settings"
import Menu from "./Menu"

interface mProps {
    activePanel: Panel,
    setPanel: (nextPanel: Panel) => void
    settings: settingsData,
    updateSettings: (updatedSettings: settingsData) => void
}

const MenuPanel = ({ settings, updateSettings, activePanel, setPanel }: mProps) => {

    function handleClose(nextPanel: Panel) {
        console.log("handleclose" + nextPanel)
        setPanel(nextPanel)
    }
    return (
        <aside className={"off-canvas rdr-menu-panel" + (activePanel !== "none" ? " active" : "")}>
            <div id={activePanel + "-panel"} className={"off-canvas-sidebar bg-background " + (activePanel !== "none" ? " active" : "")} style={{ zIndex: 202 }}>
                <header className="columns">
                    <button className=" btn btn-ghost s-circle" style={{ top: ".5rem", right: 0 }} aria-label="Close" onClick={() => { handleClose("none") }}>
                        <Icon name="close" size={18} className="close-modal btn-icon" />
                    </button>
                </header>
                <Menu onClose={handleClose} active={activePanel === "menu"} />
                <Settings settings={settings} updateSettings={updateSettings} active={activePanel == "settings"} />)

            </div>
        </aside>
    )
}

export default MenuPanel