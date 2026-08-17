import {useState, type MouseEvent} from "react";
import { NavLink } from "react-router-dom";
import RouteData from "../lib/routes.ts"

function Menu(){
    const[menuOpen, toggleMenu] = useState(false);


    return <>
          <nav className="off-canvas">
            <button className="off-canvas-toggle btn btn-action s-circle btn-primary btn-ghost p-1" onClick={()=>{toggleMenu(!menuOpen)}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24" className="navbar-toggler-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <p className="m-0 text-assistive">menu</p>
            </button>
            <ul id="sidebar-id" className={"off-canvas-sidebar bg-background "+(menuOpen ? "active":"")} >
               { RouteData.map( (link) =>{
                return <li key={link.path} className="m-2 p-0 "><NavLink to={link.path} className="nav-item p-2" >{link.label}</NavLink></li>
                })}
            </ul>
        </nav>
        </>
}

export default Menu;