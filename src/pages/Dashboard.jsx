import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { logOut } from "../services/authService";


export default function Dashboard() {
  const navigate = useNavigate();
  async function handleLogout() {

    await logOut();
    navigate("/Login");
  }
    return (
      <div style={{ padding: '2rem', color: 'white', backgroundColor: '#1f2937', minHeight: '100vh' }}>
        <h1>Welcome to your Dashboard!</h1>
        <p>You successfully signed up.</p>
        <button onClick={handleLogout}> Log Out</button>
      </div>
    );
  }
