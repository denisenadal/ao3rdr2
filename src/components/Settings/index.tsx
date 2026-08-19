import {capitalize} from "../../lib/format.ts"

import { type Panel } from "../../lib/navigation.ts"
import{ type settingsData } from "./settingTypes.ts"

import Icon from "../Icon.tsx"
import AutoComplete from "../BlockedTags/AutoComplete"

interface menuProps {
    onClose: (nextPanel?: Panel) => void
    updateSettings:(updatedSettings:settingsData)=>void
    active: boolean,
    settings: settingsData
}
const Settings = ({ settings, active, onClose,updateSettings }: menuProps) => {
    //TODO extract switch into a render function
    function handleUpdate(updatedTags:string[]){
        const updatedSettings = {...settings, blockedTags: updatedTags};
        updateSettings(updatedSettings)
    }
    const colorModeOptions = ["light","dark","system"]
    return (
        <aside className="off-canvas settings-panel">
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
                        <fieldset className="form-group m-0">
                            <label htmlFor="" className="form-switch">
                                <input type="checkbox" checked={settings.ao3.autofilter} />
                                <i className="form-icon"></i> Hide Blocked Tags
                            </label>
                        </fieldset>
                        <fieldset className="form-group m-0 columns col-6">
                            <label htmlFor="" className="form-switch">
                                <input type="checkbox" checked={settings.ao3.hideDislikes} />
                                <i className="form-icon"></i> Hide Disliked Fics
                            </label>
                        </fieldset>
                    </div>
                </section>
                <section className="table-settings">
                    <h2 className=" h5 mt-2">AO3RDR Table Settings</h2>
                    <p className="m-0">These settings control the UI of the AO3RDR app.</p>
                    <div className="columns">
                        <fieldset className="form-group m-0 columns col-6">
                            <label htmlFor="" className="form-switch">
                                <input type="checkbox" checked={settings.rdr.autofilter} />
                                <i className="form-icon"></i> Hide Blocked Tags
                            </label>
                        </fieldset>
                        <fieldset className="form-group m-0 columns col-6">
                            <label htmlFor="" className="form-switch">
                                <input type="checkbox" checked={settings.rdr.hideDislikes} />
                                <i className="form-icon"></i> Hide Disliked Fics
                            </label>
                        </fieldset>
                    </div>
                    <div className="color-mode">
                        <h3 className="h6 mb-0 mt-2 col-12">Color Mode</h3>
                        <fieldset className="color-mode-field columns m-0 p-0">
                            {colorModeOptions.map(mode=>{
                                return (
                                <div className="form-group pr-1">
                                    <label className="form-radio d-flex">
                                        <input className="form-radio-inner" type="radio" value={mode} checked={settings.colorMode  === mode} />
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