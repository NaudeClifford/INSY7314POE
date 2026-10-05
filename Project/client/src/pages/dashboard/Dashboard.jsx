import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
    const { token } = useAuth() || {};
    const API_URL = import.meta.env.VITE_API_URL;

    const [dashboard, setDashboard] = useState({
        activeGigs: 0,
        bookingsCount: 0,
        grossIncome: 0,
        platformFees: 0,
        taxAmount: 0,
        netIncome: 0,
        recentBookings: []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    function getAuthToken() {
        return token || localStorage.getItem("token");
    }

    useEffect(() => {
        async function loadDashboardData() {
            try {
                setLoading(true);
                setError("");

                const authToken = getAuthToken();
                const authHeaders = {
                    "Content-Type": "application/json",
                    ...(authToken && { Authorization: `Bearer ${authToken}` })
                };

                // Fetch Gigs, Bookings, and Transactions concurrently
                const [gigsRes, bookingsRes, txRes] = await Promise.all([
                    fetch(`${API_URL}/api/gigs/my-gigs`, {
                        credentials: "include",
                        headers: authHeaders
                    }).catch(() => null),
                    fetch(`${API_URL}/api/bookings/my-bookings`, {
                        credentials: "include",
                        headers: authHeaders
                    }).catch(() => null),
                    fetch(`${API_URL}/api/transactions`, {
                        credentials: "include",
                        headers: authHeaders
                    }).catch(() => null)
                ]);

                // Parse responses
                const gigsData = gigsRes && gigsRes.ok ? await gigsRes.json() : [];
                const bookingsData = bookingsRes && bookingsRes.ok ? await bookingsRes.json() : [];
                const txData = txRes && txRes.ok ? await txRes.json() : [];

                const gigsList = Array.isArray(gigsData) ? gigsData : gigsData.gigs || [];
                const bookingsList = Array.isArray(bookingsData) ? bookingsData : bookingsData.bookings || [];
                const txList = Array.isArray(txData) ? txData : txData.transactions || [];

                // Calculate gross income from successful transactions/bookings
                const totalGross = txList.reduce((sum, tx) => sum + (tx.amount || 0), 0);
                const platformFees = totalGross * 0.1; // 10% platform fee
                const taxAmount = totalGross * 0.15;   // 15% estimated tax
                const netIncome = totalGross - platformFees - taxAmount;

                setDashboard({
                    activeGigs: gigsList.length,
                    bookingsCount: bookingsList.length,
                    grossIncome: totalGross,
                    platformFees: Math.round(platformFees),
                    taxAmount: Math.round(taxAmount),
                    netIncome: Math.round(netIncome),
                    recentBookings: bookingsList.slice(0, 5)
                });
            } catch (err) {
                console.error("Dashboard calculation error:", err);
                setError("Failed to load dashboard data.");
            } finally {
                setLoading(false);
            }
        }

        loadDashboardData();
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
                    <strong>{dashboard.activeGigs}</strong>
                </div>

                <div className="stat-card">
                    <span>Bookings</span>
                    <strong>{dashboard.bookingsCount}</strong>
                </div>

                <div className="stat-card">
                    <span>Gross Income</span>
                    <strong>R{dashboard.grossIncome}</strong>
                </div>

                <div className="stat-card">
                    <span>Estimated Tax</span>
                    <strong>R{dashboard.taxAmount}</strong>
                </div>

            </div>

            <div className="dashboard-grid">

                <section className="dashboard-panel">

                    <h2>Income Summary</h2>

                    <div className="income-summary">

                        <div>
                            <span>Gross Income</span>
                            <strong>R{dashboard.grossIncome}</strong>
                        </div>

                        <div>
                            <span>Platform Fees</span>
                            <strong>R{dashboard.platformFees}</strong>
                        </div>

                        <div>
                            <span>Estimated Tax</span>
                            <strong>R{dashboard.taxAmount}</strong>
                        </div>

                        <div className="income-total">
                            <span>Estimated Net</span>
                            <strong>R{dashboard.netIncome}</strong>
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

                {!dashboard.recentBookings.length ? (
                    <p>No recent activity.</p>
                ) : (
                    <div className="activity-list">

                        {dashboard.recentBookings.map((booking) => (
                            <div
                                className="activity-item"
                                key={booking._id || booking.id}
                            >
                                <div>
                                    <strong>{booking.gigTitle || booking.gigId?.title || "Gig Booking"}</strong>
                                    <p>{booking.clientName || booking.clientId?.name || "Client"}</p>
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