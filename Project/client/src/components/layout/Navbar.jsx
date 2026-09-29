import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">

                <Link to="/" className="navbar-logo">
                    HustleHub+
                </Link>

                <div className="navbar-links">
                    <Link to="/">Home</Link>

                    <Link to="/marketplace">
                        Marketplace
                    </Link>

                    {!user && (
                        <>
                            <Link to="/login">Login</Link>

                            <Link
                                to="/signup"
                                className="signup-link"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}

                    {user && (
                        <>
                            <Link to="/bookings">
                                Bookings
                            </Link>

                            <Link to="/profile">
                                Profile
                            </Link>

                            {user.role === "freelancer" && (
                                <>
                                    <Link to="/dashboard">
                                        Dashboard
                                    </Link>

                                    <Link to="/create-gig">
                                        Create Gig
                                    </Link>

                                    <Link to="/transactions">
                                        Transactions
                                    </Link>
                                </>
                            )}

                            <button
                                type="button"
                                onClick={logout}
                                className="logout-button"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
}

export default Navbar;