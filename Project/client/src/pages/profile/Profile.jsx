import { useEffect, useState } from "react";

function Profile() {
    const API_URL = import.meta.env.VITE_API_URL;

    const [form, setForm] = useState({
        name: "",
        email: "",
        bio: "",
        skills: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        async function loadProfile() {
            try {
                setLoading(true);

                const response = await fetch(
                    `${API_URL}/api/users/profile`,
                    {
                        credentials: "include"
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to load profile.");
                }

                const data = await response.json();
                const user = data.user || data;

                setForm({
                    name: user.name || "",
                    email: user.email || "",
                    bio: user.bio || "",
                    skills: (user.skills || []).join(", ")
                });
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, [API_URL]);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const response = await fetch(
                `${API_URL}/api/users/profile`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: form.name.trim(),
                        bio: form.bio.trim(),
                        skills: form.skills
                            .split(",")
                            .map((skill) => skill.trim())
                            .filter(Boolean)
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update profile.");
            }

            setSuccess("Profile updated successfully.");
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <main className="page-container">
                <h1>Profile</h1>
                <p>Loading profile...</p>
            </main>
        );
    }

    return (
        <main className="page-container">

            <div className="page-heading">
                <h1>My Profile</h1>
                <p>Manage your HustleHub+ account information.</p>
            </div>

            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">{success}</div>}

            <div className="profile-layout">

                <aside className="profile-sidebar">

                    <div className="profile-avatar">
                        {form.name.charAt(0).toUpperCase()}
                    </div>

                    <h2>{form.name}</h2>

                    <p>{form.email}</p>

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
                        <label htmlFor="name">Full Name</label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            type="email"
                            value={form.email}
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bio">Bio</label>

                        <textarea
                            id="bio"
                            name="bio"
                            rows="5"
                            value={form.bio}
                            onChange={handleChange}
                            placeholder="Tell clients about yourself..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="skills">
                            Skills (comma separated)
                        </label>

                        <input
                            id="skills"
                            name="skills"
                            type="text"
                            value={form.skills}
                            onChange={handleChange}
                            placeholder="React, JavaScript, UI Design"
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>

                </form>

            </div>

        </main>
    );
}

export default Profile;