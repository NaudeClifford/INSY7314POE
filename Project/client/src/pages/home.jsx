import Hero from "../components/common/Hero";

function Home() {
    const features = [
        {
            number: "01",
            title: "Find Freelancers",
            description:
                "Browse skilled freelancers and find the right person for your project."
        },
        {
            number: "02",
            title: "Manage Projects",
            description:
                "Keep your bookings, projects and communication organised in one place."
        },
        {
            number: "03",
            title: "Track Your Income",
            description:
                "Monitor your earnings, bookings and estimated tax from your dashboard."
        }
    ];

    const categories = [
        {
            title: "Design",
            description: "Logos, graphics and creative design."
        },
        {
            title: "Development",
            description: "Websites, applications and software."
        },
        {
            title: "Writing",
            description: "Articles, copywriting and content."
        },
        {
            title: "Marketing",
            description: "Social media and digital marketing."
        },
        {
            title: "Photography",
            description: "Professional photography services."
        },
        {
            title: "Video Editing",
            description: "Video production and editing services."
        }
    ];

    return (
        <main className="main home-page">
            <Hero />

            <section className="features">
                <div className="section-container">
                    <div className="section-heading">
                        <span className="section-eyebrow">
                            WHY HUSTLEHUB+
                        </span>

                        <h2>
                            Everything you need to
                            <span> build your hustle.</span>
                        </h2>

                        <p>
                            Find opportunities, manage your work and keep
                            track of your freelance business from one place.
                        </p>
                    </div>

                    <div className="feature-grid">
                        {features.map((feature) => (
                            <article
                                className="feature-card"
                                key={feature.number}
                            >

                                <h3>{feature.title}</h3>

                                <p>{feature.description}</p>

                                <span className="feature-arrow">
                                    →
                                </span>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="categories">
                <div className="section-container">
                    <div className="section-heading">
                        <span className="section-eyebrow">
                            EXPLORE SERVICES
                        </span>

                        <h2>Find the right talent.</h2>

                        <p>
                            Explore popular freelance categories and discover
                            professionals ready to help with your next project.
                        </p>
                    </div>

                    <div className="category-grid">
                        {categories.map((category) => (
                            <article
                                className="category-card"
                                key={category.title}
                            >
                                <div className="category-icon">
                                    {category.title.charAt(0)}
                                </div>

                                <div>
                                    <h3>{category.title}</h3>
                                    <p>{category.description}</p>
                                </div>

                                <span className="category-arrow">
                                    →
                                </span>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="how-it-works">
                <div className="section-container">
                    <div className="section-heading">
                        <span className="section-eyebrow">
                            HOW IT WORKS
                        </span>

                        <h2>Start hustling in three steps.</h2>
                    </div>

                    <div className="steps-grid">
                        <div className="step">
                            <span>01</span>
                            <h3>Create your profile</h3>
                            <p>
                                Tell clients what you do, what you offer and
                                what makes you different.
                            </p>
                        </div>

                        <div className="step">
                            <span>02</span>
                            <h3>Find or create work</h3>
                            <p>
                                Discover freelance opportunities or publish
                                your own services.
                            </p>
                        </div>

                        <div className="step">
                            <span>03</span>
                            <h3>Get things done</h3>
                            <p>
                                Manage bookings, complete projects and track
                                your earnings.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-cta">
                <div className="section-container">
                    <div className="cta-card">
                        <span className="section-eyebrow">
                            READY TO GET STARTED?
                        </span>

                        <h2>Turn your skills into opportunities.</h2>

                        <p>
                            Join HustleHub+ and start building your freelance
                            career today.
                        </p>

                        <button className="button cta-button">
                            Get Started →
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;