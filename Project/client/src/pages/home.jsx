import Hero from "../components/common/Hero";

function Home() {
    return (
        <>
            <Hero />

            <section className="features">
                <div className="section-container">
                    <h2>Why Use HustleHub+?</h2>

                    <div className="feature-grid">
                        <div className="feature-card">
                            <h3>Find Freelancers</h3>
                            <p>
                                Browse talented freelancers and find the right
                                person for your project.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>Manage Projects</h3>
                            <p>
                                Keep track of your bookings and freelance
                                projects in one place.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>Track Your Income</h3>
                            <p>
                                Freelancers can monitor their earnings,
                                bookings, and estimated tax.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="categories">
                <div className="section-container">
                    <h2>Popular Categories</h2>

                    <div className="category-grid">
                        <div className="category-card">
                            <h3>Design</h3>
                            <p>Logos, graphics and creative design.</p>
                        </div>

                        <div className="category-card">
                            <h3>Development</h3>
                            <p>Websites, applications and software.</p>
                        </div>

                        <div className="category-card">
                            <h3>Writing</h3>
                            <p>Articles, copywriting and content.</p>
                        </div>

                        <div className="category-card">
                            <h3>Marketing</h3>
                            <p>Social media and digital marketing.</p>
                        </div>

                        <div className="category-card">
                            <h3>Photography</h3>
                            <p>Professional photography services.</p>
                        </div>

                        <div className="category-card">
                            <h3>Video Editing</h3>
                            <p>Video production and editing services.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;