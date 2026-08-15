import Menu from "./Menu"
import {Link, useLocation} from "react-router-dom";
import RouteData from "../lib/routes.ts";

function Header(){
    let location = useLocation();
    let routeItem = RouteData.find((r)=>{return r.path === location.pathname});
    return (
    <header className="navbar bg-body-tertiary">
        <div className="container-xxl">
            <div className="navbar-brand">
                <Link to="/"><h1>AO3rdr2</h1></Link>
                <p>{routeItem?.label }</p>
            </div>
            <Menu />
        </div>
    </header>
);}

export default Header;