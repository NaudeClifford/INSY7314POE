import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

function Profile() {
    const API_URL = import.meta.env.VITE_API_URL;
    const { token, user } = useAuth() || {};

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        bio: "",
        skills: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Get JWT from AuthContext first, then localStorage as fallback.
    const getAuthToken = () => {
        return token || localStorage.getItem("token");
    };

    useEffect(() => {
        const loadProfile = async () => {
            const authToken = getAuthToken();

            if (!authToken) {
                setError("You must be logged in to view your profile.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/api/users/profile`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    }
                );

                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(
                        data.error ||
                        data.message ||
                        "Failed to load profile."
                    );
                }

                const profile = data.data || data.user || data;

                setForm({
                    fullName: profile.fullName || "",
                    email: profile.email || "",
                    bio: profile.bio || "",
                    skills: Array.isArray(profile.skills)
                        ? profile.skills.join(", ")
                        : profile.skills || ""
                });
            } catch (err) {
                console.error("Profile loading error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [API_URL, token]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value
        }));

        // Clear messages when the user starts editing.
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const authToken = getAuthToken();

        if (!authToken) {
            setError("Your session has expired. Please log in again.");
            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const response = await fetch(
                `${API_URL}/api/users/profile`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`
                    },
                    body: JSON.stringify({
                        fullName: form.fullName.trim(),
                        bio: form.bio.trim(),
                        skills: form.skills
                            .split(",")
                            .map((skill) => skill.trim())
                            .filter(Boolean)
                    })
                }
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    data.message ||
                    "Failed to update profile."
                );
            }

            // Update the displayed data with the response from the server.
            const updatedUser = data.data || data.user || data;

            setForm((current) => ({
                ...current,
                fullName: updatedUser.fullName || current.fullName,
                bio: updatedUser.bio || "",
                skills: Array.isArray(updatedUser.skills)
                    ? updatedUser.skills.join(", ")
                    : current.skills
            }));

            setSuccess("Profile updated successfully.");
        } catch (err) {
            console.error("Profile update error:", err);
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <main className="page-container">
                <div className="page-heading">
                    <h1>My Profile</h1>
                    <p>Loading your profile...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="page-container">

            <div className="page-heading">
                <h1>My Profile</h1>
                <p>Manage your HustleHub+ account information.</p>
            </div>

            {error && (
                <div className="form-error" role="alert">
                    {error}
                </div>
            )}

            {success && (
                <div className="form-success" role="status">
                    {success}
                </div>
            )}

            <div className="profile-layout">

                <aside className="profile-sidebar">

                    <div className="profile-avatar">
                        {form.fullName
                            ? form.fullName.charAt(0).toUpperCase()
                            : "U"}
                    </div>

                    <h2>{form.fullName || "User"}</h2>

                    <p>{form.email}</p>

                    {user?.role && (
                        <span className="profile-role">
                            {user.role}
                        </span>
                    )}

                    <div className="connected-accounts">

                        <div className="account-badge">
                            Google Ready
                        </div>

                        <div className="account-badge">
                            Microsoft Ready
                        </div>

                    </div>

                </aside>

                <form
                    className="form-card profile-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">
                        <label htmlFor="fullName">
                            Full Name
                        </label>

                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                            minLength={2}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            disabled
                        />

                        <small>
                            Email addresses cannot be changed here.
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="bio">
                            Bio
                        </label>

                        <textarea
                            id="bio"
                            name="bio"
                            rows="5"
                            value={form.bio}
                            onChange={handleChange}
                            maxLength={500}
                            placeholder="Tell clients about yourself..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="skills">
                            Skills
                        </label>

                        <input
                            id="skills"
                            name="skills"
                            type="text"
                            value={form.skills}
                            onChange={handleChange}
                            placeholder="React, JavaScript, UI Design"
                        />

                        <small>
                            Separate each skill with a comma.
                        </small>
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </div>

                </form>

            </div>

        </main>
    );
}

export default Profile;