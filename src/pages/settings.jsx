import React, { useEffect, useState } from "react";
import "../styles/settings.css";
import { setUsername, getCurrentUsername, updatePassword } from "../services/authService";
import supabase from "../services/supabase";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const navigate = useNavigate();

  //username states
  const [currentUsername, setCurrentUsername] = useState("");
  const [username, setUsernameInput] = useState("");
  const [buttonText, setButtonText] = useState("Update Username");
  const [usernameLoading, setUsernameLoading] = useState(false);

  //password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  //email states
  const [email, setEmail] = useState("");

  //loading states
  const [loading, setLoading] = useState(true);

  //load email and username first
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setEmail(user.email);

      const { username } = await getCurrentUsername();
      if (username) {
        setCurrentUsername(username);
        setUsernameInput(username); // Pre-fill the input with current username
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  //________________ all the handles ________________

    //handles users changing their username
  async function handleUsernameChange(e) {
    e.preventDefault();
    if (usernameLoading) return;
    if (!username.trim() || username === currentUsername) return;

    setButtonText("Updating...");
    setUsernameLoading(true);

    const { error } = await setUsername(username.trim());

    if (error) {
      setButtonText("Update Username");
    } else {
      setCurrentUsername(username.trim());
      setButtonText("Updated!");
      setTimeout(() => setButtonText("Update Username"), 2000);
    }

    setUsernameLoading(false);
  }

  //handles users changing their password
  async function handlePasswordChange(e) {
    e.preventDefault();
    if (passwordLoading) return;
    if (!currentPassword || !newPassword) return;

    setPasswordLoading(true);

    const { error } = await updatePassword(currentPassword, newPassword, email);

    if (error) {
      alert(error.message || "Could not update password.");
    } else {
      setCurrentPassword("");
      setNewPassword("");
    }

    setPasswordLoading(false);
  }

  //handles users going back to dashboard
  function handleDashboard() {
    navigate("/dashboard");
  }

  // the ui of the page

  if (loading) {
    return (
      <div className="settings-bg">
        <div className="settings-container">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-bg">
      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>

        {/* changing profile picture */}
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
              // onChange={handleImageChange} // Implement if you want image upload!
            />
          </div>
        </section>

        {/* change username */}
        <section className="settings-section">
          <h2 className="section-title">Change Username</h2>
          <label className="input-label" htmlFor="username">New Username</label>
          <input
            id="username"
            className="settings-input"
            type="text"
            placeholder={currentUsername ? `Current: ${currentUsername}` : "Enter new username"}
            value={username}
            onChange={e => setUsernameInput(e.target.value)}
            disabled={usernameLoading}
          />
          <button
            className="settings-btn"
            style={{ marginTop: 16 }}
            onClick={handleUsernameChange}
            type="button"
            disabled={usernameLoading || !username.trim() || username === currentUsername}
          >
            {buttonText}
          </button>
        </section>

        {/* change password */}
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
                autoComplete="current-password"
              />
              <button
                type="button"
                className="eye-btn icon-left"
                onClick={() => setShowCurrent(s => !s)}
                aria-label={showCurrent ? "Hide password" : "Show password"}
              >
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
                autoComplete="new-password"
              />
              <button
                type="button"
                className="eye-btn icon-left"
                onClick={() => setShowNew(s => !s)}
                aria-label={showNew ? "Hide password" : "Show password"}
              >
              </button>
            </div>
          </div>
          <button
            className="settings-btn"
            style={{ marginTop: 16 }}
            onClick={handlePasswordChange}
            type="button"
            disabled={passwordLoading || !currentPassword || !newPassword}
          >
            {passwordLoading ? "Updating..." : "Update Password"}
          </button>
        </section>

        <button
          className="settings-btn done-btn"
          style={{ marginTop: 32, width: "100%" }}
          type="button"
          onClick={handleDashboard}
        >
          Done
        </button>
      </div>
    </div>
  );
}