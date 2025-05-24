import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../services/authService";
import "../styles/Login.css";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
  
      try {
        const { error } = await Login(email, password);
        if (error) {
          if (
            error.message?.toLowerCase().includes("email") ||
            error.message?.toLowerCase().includes("confirmed")
          ) {
            setError("Please confirm your email before logging in.");
          } else {
            setError("Invalid email or password.");
          }
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        setError("An unexpected error occurred.");
        console.error("Caught error during login:", err);
      } finally {
        setLoading(false);
      }
    };
    return (
        <div className="signup-page">
          <div className="signup-card">
            <h1>Sign in</h1>
            <p>Welcome back! Please sign in to continue.</p>
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
              <button type="submit" disabled={loading}>
                {loading ? "Signing in…" : "Sign In"}
              </button>
            </form>
            <p className="footer">
              Don&apos;t have an account? <a href="/SignUp">Sign up</a>
            </p>
          </div>
        </div>
      );
    }