import {useState} from "react";
import { NavLink } from "react-router-dom";
import RouteData from "../lib/routes.ts"

function Menu(){
    const[menuOpen, toggleMenu] = useState(false);

    return <>
          <nav className="rightCol position-relative d-flex align-items-end justify-content-end" style={{minWidth:200}}>
            <button className="navbar-toggler" onClick={()=>{toggleMenu(!menuOpen)}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24" className="navbar-toggler-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <p className="visually-hidden">menu</p>
            <ul className={`dropdown-menu align-items-start position-absolute ${menuOpen ? " show" : ""}`} >
               { RouteData.map( (link) =>{
                let linkClasses = "dropdown-item p-3";
                return <li key={link.path}><NavLink to={link.path} className={linkClasses} >{link.label}</NavLink></li>
                })}
            </ul>
            </button>
        </nav>
        </>
}

export default Menu;