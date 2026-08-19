import {useState, type MouseEvent} from "react";
import {type Panel} from "../../lib/routes.ts"

import Icon from "../Icon.tsx"

interface menuProps{
    onClose: (nextPanel?:Panel)=> void
    active: boolean
}

const Settings = ({active,onClose}:menuProps) => {

  return (
    <aside className="off-canvas">
        <form id="settings-form" className={"off-canvas-sidebar bg-background "+(active ? "active":"")} style={{zIndex:202}}>
            <header className="columns">
            <h2>AO3 Widget Settings</h2>
            <button className="btn btn-ghost s-circle" style={{top:".5rem",right:0}} aria-label="Close" onClick={()=>{onClose("none")}}>
              <Icon name="close" size={18} className="close-modal btn-icon" />
            </button>
        </header>
        <p>These settings control the UI of the AO3 website</p>
        <fieldset className="form-group">
            <label htmlFor="" className="form-switch">
                <input type="checkbox" />
                <i className="form-icon"></i> Hide Blocked Tags
            </label>
        </fieldset>
        <fieldset className="form-group">
            <label htmlFor="" className="form-switch">
                <input type="checkbox" />
                <i className="form-icon"></i> Hide Disliked Fics
            </label>
        </fieldset>
        <h2>AO3RDR Table Settings</h2>
    </form>
    </aside>
  )
}

export default Settings