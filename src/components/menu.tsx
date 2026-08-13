import {useState} from "react";

function Menu(){
    const links = [
        {"label":"Home", callback: null},
        {"label":"Backup", callback: null},
        {"label":"Preferences", callback: null},
        {"label":"About/Help", callback: null}
    ];
    const [activeLink, setActiveLink] = useState(0);
    const[menuOpen, toggleMenu] = useState(false);



    return <>
          <nav className="rightCol position-relative" style={{minWidth:200}}>
            <button className="navbar-toggler" onClick={()=>{toggleMenu(!menuOpen)}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24" className="navbar-toggler-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <p className="visually-hidden">menu</p>
            <ul className={`dropdown-menu align-items-start position-absolute ${menuOpen ? " show" : ""}`} >
               { links.map( (link,i) =>{
                let linkClasses = "dropdown-item p-3";
                linkClasses += activeLink === i ? ' active' : ''
                return <li ><a href="#" className={linkClasses} key="{link}" onClick={()=>{ setActiveLink(i)}}>{link.label}</a></li>
                })}
            </ul>
            </button>
        </nav>
        </>
}

export default Menu;