
import { Outlet, Link } from "react-router-dom";
export default function Navbar(){

    return <nav className="nav">
        
        <ul>
        <li className="site-title">
        ART GALLERY
        </li>
            <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/shop">Shop </Link>

            </li>
            <li>
                <Link to="/checkout">Check out</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <input type="text" placeholder="Search.."></input>
        </ul>
        
        
    </nav>

}



