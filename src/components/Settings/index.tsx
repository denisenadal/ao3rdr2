import { useState, type MouseEvent } from "react";
import { type Panel } from "../../lib/routes.ts"
import type {settingsData} from "./settingTypes.ts"

import Icon from "../Icon.tsx"

interface menuProps {
    onClose: (nextPanel?: Panel) => void
    active: boolean,
    settings: settingsData
}

const Settings = ({ settings,active, onClose }: menuProps) => {

    return (
        <aside className="off-canvas settings-panel">
            <form id="settings-form" className={"off-canvas-sidebar bg-background " + (active ? " active" : "")} style={{ zIndex: 202 }}>
                <header className="columns">
                    <button className="p-absolute btn btn-ghost s-circle" style={{ top: ".5rem", right: 0 }} aria-label="Close" onClick={(e) => { e.preventDefault; onClose("none") }}>
                        <Icon name="close" size={18} className="close-modal btn-icon" />
                    </button>
                </header>
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
                    <h2 className=" h5 mb-0 mt-2">AO3RDR Table Settings</h2>
                    <p className="my-1">These settings control the UI of the AO3RDR app.</p>
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
                </section>
                <section className="blocked-tags">
                <h2 className="column h5 mb-0 mt-2">Blocked Tags</h2>
                <ul>
                    {settings.blockedTags.map(t=>{
                        return <li>{t}</li>
                    })}
                 </ul>
                </section>
            </form>
        </aside>
    )
}

export default Settings