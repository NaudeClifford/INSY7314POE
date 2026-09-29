import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Find Work. Hire Talent. Grow.</h1>

                <p>
                    HustleHub+ connects clients with talented freelancers
                    for projects of all kinds.
                </p>

                <div className="hero-buttons">
                    <Link to="/marketplace" className="hero-button primary">
                        Browse Gigs
                    </Link>

                    <Link to="/signup" className="hero-button secondary">
                        Get Started
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;