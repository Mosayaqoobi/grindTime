// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Calendar, Users, Library, Settings, Power } from "lucide-react";
import supabase from "../services/supabase";
import { logOut } from "../services/authService";
import "../styles/ClassCustomization.css";

export default function CreateClass() {
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState(null);
    const [description, setDescription] = useState("");
    const [instructor, setInstructor] = useState("");
    const [color, setColor] = useState("");
  
    const handlePhotoChange = (e) => {
      setPhoto(e.target.files[0]);
    };
  
    return (
      <main className="create-class-page">
        <h1>Create a Class</h1>
        <form className="create-class-form" onSubmit={handleSubmit}>
          <label>
            Class Name
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Calculus 101"
              required
            />
          </label>
  
          <label>
            Class Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </label>
  
          <label>
            Description
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Short summary of this class"
              rows={3}
            />
          </label>
  
          <label>
            Instructor Name
            <input
              type="text"
              value={instructor}
              onChange={e => setInstructor(e.target.value)}
              placeholder="e.g. Dr. Me"
            />
          </label>
  
          <label>
            Calendar Color
            <input
              type="color"
              value={color}
              onChange={e => setColor(e.target.value)}
            />
          </label>
  
          <button type="submit" className="submit-btn">
            Create Class
          </button>
        </form>
      </main>
    );
  }