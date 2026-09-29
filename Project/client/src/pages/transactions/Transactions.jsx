import { useEffect, useState } from "react";

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({
        gross: 0,
        fees: 0,
        tax: 0,
        net: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function loadTransactions() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/api/transactions`,
                    {
                        credentials: "include"
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to load transactions.");
                }

                const data = await response.json();

                const list = data.transactions || data;

                setTransactions(list);

                setSummary({
                    gross:
                        data.summary?.gross ??
                        list.reduce((total, item) => total + (item.amount || 0), 0),
                    fees:
                        data.summary?.fees ??
                        list.reduce((total, item) => total + (item.platformFee || 0), 0),
                    tax:
                        data.summary?.tax ??
                        list.reduce((total, item) => total + (item.taxAmount || 0), 0),
                    net:
                        data.summary?.net ??
                        list.reduce((total, item) => total + (item.freelancerAmount || 0), 0)
                });
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadTransactions();
    }, [API_URL]);

    function formatDate(date) {
        return new Date(date).toLocaleDateString("en-ZA", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    }

    if (loading) {
        return (
            <main className="page-container">
                <h1>Transactions</h1>
                <p>Loading transactions...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="page-container">
                <h1>Transactions</h1>
                <div className="form-error">{error}</div>
            </main>
        );
    }

    return (
        <main className="page-container">

            <div className="page-heading">
                <h1>Transactions</h1>
                <p>Your earnings, fees and tax overview.</p>
            </div>

            <div className="stats-grid">

                <div className="stat-card">
                    <span>Gross</span>
                    <strong>R{summary.gross}</strong>
                </div>

                <div className="stat-card">
                    <span>Platform Fees</span>
                    <strong>R{summary.fees}</strong>
                </div>

                <div className="stat-card">
                    <span>Estimated Tax</span>
                    <strong>R{summary.tax}</strong>
                </div>

                <div className="stat-card">
                    <span>Net Income</span>
                    <strong>R{summary.net}</strong>
                </div>

            </div>

            {transactions.length === 0 ? (
                <div className="empty-state">
                    <h2>No transactions yet</h2>
                    <p>Your completed bookings will appear here.</p>
                </div>
            ) : (
                <div className="transaction-table-wrapper">

                    <table className="transaction-table">

                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Booking</th>
                                <th>Status</th>
                                <th>Amount</th>
                                <th>Fee</th>
                                <th>Tax</th>
                                <th>Net</th>
                            </tr>
                        </thead>

                        <tbody>

                            {transactions.map((transaction) => (
                                <tr key={transaction._id || transaction.id}>
                                    <td>{formatDate(transaction.createdAt)}</td>

                                    <td>{transaction.bookingTitle || "Booking"}</td>

                                    <td>
                                        <span
                                            className={`booking-status booking-status-${transaction.status}`}
                                        >
                                            {transaction.status}
                                        </span>
                                    </td>

                                    <td>R{transaction.amount}</td>
                                    <td>R{transaction.platformFee}</td>
                                    <td>R{transaction.taxAmount}</td>
                                    <td>R{transaction.freelancerAmount}</td>
                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            )}

        </main>
    );
}

export default Transactions;