import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { logOut } from "../services/authService";
import "../styles/Dashboard.css";


export default function Dashboard() {
  const navigate = useNavigate();
  async function handleLogout() {
    await logOut();
    navigate("/Login");
  }
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome!</h1>
        <p>“Keep Grinding!”</p>
      </header>
      <main className="dashboard-main">
        <section className="timer-section">
          <h2>Study Timer</h2>
          <button>Start</button>
          <button>Stop</button>
          <div>Today: 2h 15m | Weekly: 8h 40m</div>
        </section>
        <section className="groups-section">
          <h2>Your Groups</h2>
          <ul>
            <li>Study Buddies (4 members) <button>Chat</button></li>
            <li>Math 101 Club (8 members) <button>Chat</button></li>
            <li><button>+ Create/Join New Group</button></li>
          </ul>
        </section>
        <section className="leaderboard-section">
          <h2>Leaderboard (Today)</h2>
          <ol>
            <li>Alice – 3h 10m</li>
            <li>Bob – 2h 40m</li>
            <li>You – 2h 15m</li>
          </ol>
        </section>
        <section className="actions-section">
          <button>View Statistics</button>
          <button>Edit Profile</button>
          <button type="button" onClick={handleLogout}>Logout</button>
        </section>
      </main>
    </div>
  );
}
