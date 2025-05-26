import React, { useEffect, useState } from "react";
import "../styles/settings.css"; // Make sure this path matches your project
import { setUsername, getCurrentUsername } from "../services/authService";
import supabase from "../services/supabase";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../services/authService";

export default function SettingsPage() {
    const navigate = useNavigate();
    const [currentUsername, setCurrentUsername] = useState("");
    const [username, setUsernameInput] = useState("");
    const [buttonText, setButtonText] = useState("Update Username");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [loading, setLoading] = useState(true);
    const [usernameLoading, setUsernameLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);

  async function handleImageChange(e) {
    // handle image upload logic
  }
  async function handleUsernameChange(e) {
    e.preventDefault();

    if (usernameLoading) {  //avoid duplicated clicks
        return;
    }

    if (!username.trim()) { //dont allow button press if input empty
        return;
    }

    setButtonText("Updating...");
    setUsernameLoading(true);

    const { error } = await setUsername(username.trim());

    if (error) {
        alert(error.message || "Could not update username.");
        setButtonText("Update Username");
    } else {
        setCurrentUsername(username.trim());
        setUsernameInput(""); // Optionally clear field
        setButtonText("Updated!");
        setTimeout(() => setButtonText("Update Username"), 5000);
    }

    setUsernameLoading(false);
}
    async function handlePasswordChange(e) {
        // handle password change logic
        e.preventDefault();
        if (!newPassword) return;

        setPasswordLoading(true);
        const { error }  = await updatePassword(newPassword);
        setPasswordLoading(false);

        if (error) {
          alert(error.message || "Could not update password.");
        }
        else {
          setCurrentPassword("");
          setNewPassword("");
        }


    }

    useEffect(() => {
        async function fetchUsername() {
            setLoading(true);
          const { username } = await getCurrentUsername();
          if (username) {
            setCurrentUsername(username); //what's in DB
            setUsername(username);        //pre-fill the input
            setLoading(false);
          }
        }
        fetchUsername();
      }, []);

      function handleDashboard() {
        navigate("/dashboard");
      }

      if (loading) {    //while loading the username so it doesnt look fonky
        return (
          <div className="settings-bg">
            <div className="settings-container">
              <h2>Loading...</h2>
            </div>
          </div>
        );
      };

      //once loading the username is done
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
            placeholder={currentUsername ? `${currentUsername}` : "Enter new username"}
            value={username}
            onChange={e => setUsernameInput(e.target.value)}
          />
          <button
            className="settings-btn"
            style={{ marginTop: 16 }}
            onClick={handleUsernameChange}
            type="button"
            disabled={usernameLoading}
          >
            {buttonText}
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
        <button
        className="settings-btn done-btn"
        style={{ marginTop: 32, width: "100%" }}
        type="button"
        onClick={handleDashboard}>done</button>
      </div>
    </div>
  );
};