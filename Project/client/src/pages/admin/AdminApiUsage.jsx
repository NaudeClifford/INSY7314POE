import { useEffect, useState } from "react";

function AdminApiUsage() {
    const API_URL = import.meta.env.VITE_API_URL;

    const [usage, setUsage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadUsage();
    }, []);

    async function loadUsage() {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/api/admin/api-usage`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to load API usage."
                );
            }

            setUsage(
                data.usage || data || []
            );
        } catch (err) {
            console.error(
                "Failed to load API usage:",
                err
            );

            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <main className="page-container">
                <div className="page-heading">
                    <h1>API Usage</h1>
                    <p>
                        Loading API usage...
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="page-container">
            <div className="page-heading">
                <h1>API Usage</h1>
                <p>
                    Monitor API requests made by the
                    application.
                </p>
            </div>

            {error && (
                <div className="form-error">
                    {error}
                </div>
            )}

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Endpoint</th>
                            <th>Method</th>
                            <th>Requests</th>
                            <th>Successful</th>
                            <th>Failed</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usage.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="admin-empty"
                                >
                                    No API usage data
                                    found.
                                </td>
                            </tr>
                        ) : (
                            usage.map((item) => (
                                <tr
                                    key={
                                        item._id ||
                                        item.id
                                    }
                                >
                                    <td>
                                        {item.date
                                            ? new Date(
                                                item.date
                                            ).toLocaleDateString(
                                                "en-ZA"
                                            )
                                            : "—"}
                                    </td>

                                    <td>
                                        {item.endpoint ||
                                            "—"}
                                    </td>

                                    <td>
                                        {item.method ||
                                            "—"}
                                    </td>

                                    <td>
                                        {item.requests ||
                                            0}
                                    </td>

                                    <td>
                                        {item.successful ||
                                            0}
                                    </td>

                                    <td>
                                        {item.failed ||
                                            0}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default AdminApiUsage;