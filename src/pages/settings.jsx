import React, { useEffect, useState } from "react";
import "../styles/settings.css"; // Make sure this path matches your project
import { setUsername, getCurrentUsername } from "../services/authService";
import supabase from "../services/supabase";

export default function SettingsPage() {
    const [currentUsername, setCurrentUsername] = useState(""); //stored in the db
    const [username, setUsername] = useState("");   //for editing 
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [loading, setLoading] = useState(true);

  async function handleImageChange(e) {
    // handle image upload logic
  }
  async function handleUsernameChange(e) {
    // handle username change logic
    e.preventDefault();
    if (!username.trim()) return;
    const { error } = await setUsername(username.trim());
    if (error) {
        alert(error.message || "Could not update username.");
    } else {
        alert("Username updated!");
        setUsername(""); // Optionally clear field
    }
  }
    async function handlePasswordChange() {
        // handle password change logic
    }

    useEffect(() => {
        async function fetchUsername() {
          const { username } = await getCurrentUsername();
          if (username) {
            setLoading(true);
            setCurrentUsername(username); //what's in DB
            setUsername(username);        //pre-fill the input
            setLoading(false);
          }
        }
        fetchUsername();
      }, []);


  return (
    <div className="settings-bg">
      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>

        {/* Profile Picture */}
        <section className="settings-section">
          <div className="profile-pic-area">
            <div className="profile-pic">
              <span className="profile-icon">&#128100;</span>
            </div>
            <button
              className="settings-btn"
              type="button"
              onClick={() => document.getElementById('profile-pic-input').click()}
            >
              Choose Image
            </button>
            <input
              id="profile-pic-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </section>

        {/* Change Username */}
        <section className="settings-section">
          <h2 className="section-title">Change Username</h2>
          <label className="input-label" htmlFor="username">New Username</label>
          <input
            id="username"
            className="settings-input"
            type="text"
            placeholder={currentUsername ? `Current: ${currentUsername}` : "Enter new username"}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <button className="settings-btn" style={{ marginTop: 16 }} onClick={handleUsernameChange}>
            Update Username
          </button>
        </section>

        {/* Change Password */}
        <section className="settings-section">
          <h2 className="section-title">Change Password</h2>
          <div className="input-group">
            <label className="input-label" htmlFor="current-password">Current Password</label>
            <div className="settings-password-row">
              <input
                id="current-password"
                className="settings-input"
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowCurrent(s => !s)}
                aria-label={showCurrent ? "Hide password" : "Show password"}
              >
                {showCurrent ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="new-password">New Password</label>
            <div className="settings-password-row">
              <input
                id="new-password"
                className="settings-input"
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowNew(s => !s)}
                aria-label={showNew ? "Hide password" : "Show password"}
              >
                {showNew ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <button className="settings-btn" style={{ marginTop: 16 }}>
            Update Password
          </button>
        </section>
      </div>
    </div>
  );
}