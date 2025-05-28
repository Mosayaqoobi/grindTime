// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Calendar, Users, Library, Settings, Power } from "lucide-react";
import supabase from "../services/supabase";
import { logOut } from "../services/authService";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [loading, setLoading]   = useState(true);
  const navigate                = useNavigate();

  useEffect(() => {
    async function fetchUsername() {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

      setUsername(profile.username);
      setLoading(false);
    }
    fetchUsername();
  }, [navigate]);

  async function handleLogout() {
    await logOut();
    navigate("/login");
  }

  function handleSettings() {
    navigate("/setting");
  }

  if (loading) {
    return (
      <main className="dashboard-main">
        <h2>Loading…</h2>
      </main>
    );
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="profile-info">
          <img
            src="https://via.placeholder.com/40"
            alt="avatar"
            className="sidebar-avatar"
          />
          <p className="sidebar-greeting">Hi, {username}</p>
        </div>

        <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "sidebar-btn active" : "sidebar-btn" } > <Home size={20} className="sidebar-icon" /> <span>Home</span> </NavLink>
        {/* Only include this if you have a /calendar route */}
        <NavLink to="/calendar" className={({ isActive }) => isActive ? "sidebar-btn active" : "sidebar-btn" } > <Calendar size={20} className="sidebar-icon" /> <span>Calendar</span> </NavLink>
        <NavLink to="/study-groups" className={({ isActive }) => isActive ? "sidebar-btn active" : "sidebar-btn" } ><Users size={20} className="sidebar-icon" /> <span>Study Groups</span> </NavLink>
        <NavLink to="/classes"className={({ isActive }) => isActive ? "sidebar-btn active" : "sidebar-btn" }> <Library size={20} className="sidebar-icon" /> <span>Classes</span> </NavLink>


        <button className="sidebar-btn" onClick={handleSettings} type="button"> <Settings size={20} className="sidebar-icon" /> <span>Settings</span></button> 
        <button className="sidebar-btn" onClick={handleLogout} type="button"> <Power size={20} className="sidebar-icon" /><span>Logout</span></button>
      </aside>

      <main className="dashboard-main">
        <h1 className="dashboard-title">Dashboard</h1>

        <h2 className="section-title">Classes</h2>
        <section className="classes">
          <div className="class-card">
            <img
              src="https://via.placeholder.com/200x120"
              alt="Sample Class"
              className="class-img"
            />
            <h3 className="class-title">Calculus 101</h3>
            <p className="class-subtitle">Prof. Emily Carter</p>
          </div>
          <div className="class-card">
            <img
              src="https://via.placeholder.com/200x120"
              alt="Sample Class"
              className="class-img"
            />
            <h3 className="class-title">Physics 202</h3>
            <p className="class-subtitle">Dr. Jane Doe</p>
          </div>
        </section>

        <h2 className="section-title">Study Stats</h2>
        <section className="stats">
          <div className="stat-card">
            <h3 className="stat-title">Today</h3>
            <p className="stat-number">3 hours</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Weekly</h3>
            <p className="stat-number">8 h 40 m</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Average</h3>
            <p className="stat-number">88%</p>
          </div>
        </section>

        <h2 className="section-title">Study Groups</h2>
        <section className="study-groups">
          <div className="group-card">
            <img
              src="https://via.placeholder.com/240x140"
              alt="Sample Group"
              className="group-img"
            />
            <h3 className="group-title">Math 101 Club</h3>
            <p className="group-subtitle">8 members</p>
          </div>
        </section>

        <section className="join-group">
          <button className="action-btn">Join a Study Group</button>
        </section>
      </main>
    </div>
  );
}