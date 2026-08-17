import Menu from "./Menu"
import {Link, useLocation} from "react-router-dom";
import RouteData from "../lib/routes.ts";

function Header(){
    let location = useLocation();
    let routeItem = RouteData.find((r)=>{return r.path === location.pathname});
    return (
    <header className="navbar">
        <div className="container grid-xxl">
            <div className="navbar-brand">
                <Link to="/"><h1 className="m-0">AO3rdr2</h1></Link>
                <p className="m-0">{routeItem?.label }</p>
            </div>
            <Menu />
        </div>
    </header>
);}

export default Header;