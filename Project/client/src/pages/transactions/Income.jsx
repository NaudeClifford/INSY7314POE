import { useEffect, useState } from "react";

function Income() {
    const API_URL = import.meta.env.VITE_API_URL;

    const [income, setIncome] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadIncome();
    }, []);

    async function loadIncome() {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/api/income`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to load income."
                );
            }

            setIncome(data.income || data);
        } catch (err) {
            console.error("Failed to load income:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function formatCurrency(value) {
        return `R${Number(value || 0).toLocaleString(
            "en-ZA",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )}`;
    }

    if (loading) {
        return (
            <main className="page-container">
                <div className="page-heading">
                    <h1>Income</h1>
                    <p>Loading your income...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="page-container">
                <div className="page-heading">
                    <h1>Income</h1>
                </div>

                <div className="form-error">
                    {error}
                </div>
            </main>
        );
    }

    const summary = income?.summary || {};

    const monthlyIncome =
        income?.monthlyIncome ||
        income?.monthly ||
        [];

    return (
        <main className="page-container">
            <div className="page-heading">
                <h1>Income</h1>
                <p>
                    Track your earnings, fees and estimated
                    tax.
                </p>
            </div>

            <section className="stats-grid">
                <div className="stat-card">
                    <span className="stat-label">
                        Gross Income
                    </span>

                    <strong className="stat-value">
                        {formatCurrency(summary.gross)}
                    </strong>
                </div>

                <div className="stat-card">
                    <span className="stat-label">
                        Platform Fees
                    </span>

                    <strong className="stat-value">
                        {formatCurrency(summary.fees)}
                    </strong>
                </div>

                <div className="stat-card">
                    <span className="stat-label">
                        Estimated Tax
                    </span>

                    <strong className="stat-value">
                        {formatCurrency(summary.tax)}
                    </strong>
                </div>

                <div className="stat-card">
                    <span className="stat-label">
                        Net Income
                    </span>

                    <strong className="stat-value">
                        {formatCurrency(summary.net)}
                    </strong>
                </div>
            </section>

            <section className="dashboard-panel">
                <div className="panel-heading">
                    <div>
                        <h2>Monthly Income</h2>
                        <p>
                            Your earnings over time.
                        </p>
                    </div>
                </div>

                {monthlyIncome.length === 0 ? (
                    <p>
                        No monthly income data available yet.
                    </p>
                ) : (
                    <div className="income-chart">
                        {monthlyIncome.map((month) => (
                            <div
                                className="income-chart-item"
                                key={
                                    month.month ||
                                    month.label
                                }
                            >
                                <div className="income-bar-container">
                                    <div
                                        className="income-bar"
                                        style={{
                                            height: `${Math.max(
                                                Number(
                                                    month.amount || 0
                                                ) /
                                                Math.max(
                                                    ...monthlyIncome.map(
                                                        (item) =>
                                                            Number(
                                                                item.amount ||
                                                                0
                                                            )
                                                    )
                                                ) *
                                                100,
                                                5
                                            )}%`
                                        }}
                                    />
                                </div>

                                <strong>
                                    {formatCurrency(
                                        month.amount
                                    )}
                                </strong>

                                <span>
                                    {month.month ||
                                        month.label}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="dashboard-panel">
                <div className="panel-heading">
                    <div>
                        <h2>Income Breakdown</h2>
                        <p>
                            How your income is distributed.
                        </p>
                    </div>
                </div>

                <div className="income-breakdown">
                    <div className="income-breakdown-row">
                        <span>Gross income</span>

                        <strong>
                            {formatCurrency(summary.gross)}
                        </strong>
                    </div>

                    <div className="income-breakdown-row">
                        <span>Platform fees</span>

                        <strong>
                            -{formatCurrency(summary.fees)}
                        </strong>
                    </div>

                    <div className="income-breakdown-row">
                        <span>Estimated tax</span>

                        <strong>
                            -{formatCurrency(summary.tax)}
                        </strong>
                    </div>

                    <div className="income-breakdown-total">
                        <span>Estimated net income</span>

                        <strong>
                            {formatCurrency(summary.net)}
                        </strong>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Income;