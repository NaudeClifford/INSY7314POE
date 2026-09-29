import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function loadDashboard() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/api/dashboard`,
                    {
                        credentials: "include"
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to load dashboard.");
                }

                const data = await response.json();

                setDashboard(data.dashboard || data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, [API_URL]);

    if (loading) {
        return (
            <main className="page-container">
                <h1>Dashboard</h1>
                <p>Loading dashboard...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="page-container">
                <h1>Dashboard</h1>
                <div className="form-error">{error}</div>
            </main>
        );
    }

    return (
        <main className="page-container">

            <div className="page-heading">
                <h1>Freelancer Dashboard</h1>
                <p>Manage your gigs, bookings and income.</p>
            </div>

            <div className="stats-grid">

                <div className="stat-card">
                    <span>Active Gigs</span>
                    <strong>{dashboard?.activeGigs ?? 0}</strong>
                </div>

                <div className="stat-card">
                    <span>Bookings</span>
                    <strong>{dashboard?.bookings ?? 0}</strong>
                </div>

                <div className="stat-card">
                    <span>Gross Income</span>
                    <strong>R{dashboard?.grossIncome ?? 0}</strong>
                </div>

                <div className="stat-card">
                    <span>Estimated Tax</span>
                    <strong>R{dashboard?.taxAmount ?? 0}</strong>
                </div>

            </div>

            <div className="dashboard-grid">

                <section className="dashboard-panel">

                    <h2>Income Summary</h2>

                    <div className="income-summary">

                        <div>
                            <span>Gross Income</span>
                            <strong>R{dashboard?.grossIncome ?? 0}</strong>
                        </div>

                        <div>
                            <span>Platform Fees</span>
                            <strong>R{dashboard?.platformFees ?? 0}</strong>
                        </div>

                        <div>
                            <span>Estimated Tax</span>
                            <strong>R{dashboard?.taxAmount ?? 0}</strong>
                        </div>

                        <div className="income-total">
                            <span>Estimated Net</span>
                            <strong>R{dashboard?.netIncome ?? 0}</strong>
                        </div>

                    </div>

                </section>

                <section className="dashboard-panel">

                    <h2>Quick Actions</h2>

                    <div className="quick-actions">

                        <Link
                            to="/create-gig"
                            className="button"
                        >
                            Create New Gig
                        </Link>

                        <Link
                            to="/bookings"
                            className="button secondary-button"
                        >
                            View Bookings
                        </Link>

                        <Link
                            to="/transactions"
                            className="button secondary-button"
                        >
                            View Transactions
                        </Link>

                    </div>

                </section>

            </div>

            <section className="dashboard-panel">

                <h2>Recent Activity</h2>

                {!dashboard?.recentBookings?.length ? (
                    <p>No recent activity.</p>
                ) : (
                    <div className="activity-list">

                        {dashboard.recentBookings.map((booking) => (
                            <div
                                className="activity-item"
                                key={booking._id || booking.id}
                            >
                                <div>
                                    <strong>{booking.gigTitle}</strong>
                                    <p>{booking.clientName}</p>
                                </div>

                                <span>
                                    {booking.status}
                                </span>
                            </div>
                        ))}

                    </div>
                )}

            </section>

        </main>
    );
}

export default Dashboard;