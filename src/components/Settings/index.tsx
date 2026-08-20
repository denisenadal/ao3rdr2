import {capitalize} from "../../lib/format.ts"

import { type Panel } from "../../lib/navigation.ts"
import{ type settingsData, type fieldset, type field } from "./settingTypes.ts"
import {type colorMode} from "../../types/theme.ts"

import Icon from "../Icon.tsx"
import AutoComplete from "../BlockedTags/AutoComplete"

interface menuProps {
    onClose: (nextPanel?: Panel) => void
    updateSettings:(updatedSettings:settingsData)=>void
    active: boolean,
    settings: settingsData
}

const Settings = ({ settings, active, onClose,updateSettings }: menuProps) => {
    const colorModeOptions: colorMode[] = ["light", "dark", "system"]

    function handleUpdate(updatedTags:string[]){
        const updatedSettings = {...settings, blockedTags: updatedTags};
        updateSettings(updatedSettings)
    }
    function handleSwitch(fieldname:field,isChecked:boolean) {
        const updatedSettings ={...settings, [fieldname]: !isChecked }
        updateSettings(updatedSettings)
    }
    function renderSwitch({fieldname,label}:fieldset){
       const isChecked:boolean = settings[fieldname] || false;
        return (<fieldset className="form-group m-0 columns col-6">
            <label htmlFor={fieldname} className="form-switch" onClick={()=>{handleSwitch(fieldname,isChecked)}}>
                <input name={fieldname} type="checkbox" checked={isChecked} readOnly={true} />
                <i className="form-icon"></i> {label}
            </label>
        </fieldset>)
    }
   return (
        <aside className={"off-canvas rdr-menu-panel settings-panel" + (active ? " active":"")}>
            <form id="settings-form" className={"off-canvas-sidebar bg-background " + (active ? " active" : "")} style={{ zIndex: 202 }}>
                <header className="columns">
                    <button className="p-absolute btn btn-ghost s-circle" style={{ top: ".5rem", right: 0 }} aria-label="Close" onClick={(e) => { e.preventDefault;  e.stopPropagation();  e.nativeEvent.stopImmediatePropagation(); onClose("none") }}>
                        <Icon name="close" size={18} className="close-modal btn-icon" />
                    </button>
                </header>
                <section className="blocked-tags">
                    <h2 className="column h5 mb-2">Blocked Tags</h2>
                    <AutoComplete tags={settings.blockedTags} onUpdateTags={handleUpdate}/>
                </section>
                <section className="ao3-settings ">
                    <h2 className=" h5 m-0 columns col-6">AO3 Widget Settings</h2>
                    <p className="my-1">These settings control the UI of the AO3 website</p>
                    <div className="columns">
                    {renderSwitch({fieldname:"ao3_hideBlockedTags",label: "Automatically hide fics with blocked tags"})}
                    {renderSwitch({fieldname:"ao3_hideDislikes", label: "Hide Disliked Fics"})}
                    </div>
                </section>
                <section className="table-settings">
                    <h2 className=" h5 mt-2">AO3RDR Table Settings</h2>
                    <p className="m-0">These settings control the UI of the AO3RDR app.</p>
                    <div className="columns">
                        {renderSwitch({fieldname:"rdr_hideDislikes", label: "Hide Disliked Fics"})}
                    </div>
                    <div className="color-mode">
                        <h3 className="h6 mb-0 mt-2 col-12">Color Mode</h3>
                        <fieldset className="color-mode-field columns m-0 p-0">
                            {colorModeOptions.map(mode =>{
                                return (
                                <div key={mode} className="form-group pr-1">
                                    <label className="form-radio d-flex">
                                        <input className="form-radio-inner" type="radio" value={mode} checked={settings.colorMode  === mode} onChange={() => updateSettings({ ...settings, colorMode: mode })} />
                                        <i className="form-icon"></i> {capitalize(mode)}
                                    </label>
                                </div>
                                )
                            })}
                        </fieldset>
                    </div>
                </section>
            </form>
        </aside>
    )
}

export default Settings