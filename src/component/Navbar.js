export default function Navbar(){

    return <nav className="nav">
        <a href="/" className="site-title">ART GALLERY</a>
        <ul>
        
            <li>
                <a href="/availables">Product listing</a>
                </li>
                <li>
                <a href="/details">Product details </a>

            </li>
            <li>
                <a href="/history">Order History</a>
            </li>
            <li>
                <a href="/checkout">Check out</a>
            </li>
            <input type="text" placeholder="Search.."></input>
        </ul>
        
        
    </nav>
}