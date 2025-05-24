import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../services/authService";
import "../styles/SignUp.css";


export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await SignUp(email, password);
    if (error) {
      setError(error.message);
      setShowMessage("");
    } else {
      setError("");
      setShowMessage("Check your email for a confirmation link to complete registration.");
    }
    setLoading(false);
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1>Create an account</h1>
        <p>Sign up to get started with our service</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <label>
            Email Address
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          {error && <div className="error">{error}</div>}
          {showMessage && <div className="success">{showMessage}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing up…" : "Sign Up"}
          </button>
        </form>

        <p className="footer">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
}