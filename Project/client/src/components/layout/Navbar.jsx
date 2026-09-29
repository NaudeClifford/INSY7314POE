import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <header className="navabar">

            <div className="logo">
                HustleHub+
            </div>
            
            <nav>
                <h1>HustleHub+</h1>

                <div>
                    <Link to="/">Home</Link>
                    <Link to="/marketplace">Marketplace</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;