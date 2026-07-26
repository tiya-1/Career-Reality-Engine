import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [darkMode]);
 
  const toggleDarkMode = () => setDarkMode(prev => !prev);

const handleLogout = () => {
  localStorage.clear();
  setUser(null);
  navigate("/");
  window.location.reload();
};

const handleSignup = () => navigate("/signup");
const handleLogin = () => navigate("/login");

const handleNavClick = (path) => {
  setMenuOpen(false);
  navigate(path);
};

return (
  <nav className="navbar">
    <div className="navbar-inner">

      {/* LEFT SIDE */}
      <div className="nav-left">
        <div className="logo" onClick={() => navigate("/")}>
          PathFinder
        </div>

        <div className="nav-links">
          <span onClick={() => handleNavClick("/")}>Home</span>
          <span onClick={() => handleNavClick("/features")}>Features</span>
          <span onClick={() => handleNavClick("/overview")}>Overview</span>
          <span onClick={() => handleNavClick("/blog")}>Blog</span>
          <span onClick={() => handleNavClick("/pricing")}>Pricing</span>
{/* 
          {user && (
           <span
               className="dashboard-link"
          onClick={() => handleNavClick("/dashboard")}
            >
             My Roadmaps
           </span>
          )} */}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">

        <input type="text" placeholder="Search..." className="nav-search" />

        <button className="dark-toggle" onClick={toggleDarkMode}>
          {darkMode ? "🌞" : "🌙"}
        </button>

        {!user ? (
          <>
            <button className="signup-btn btn-secondary" onClick={handleSignup}>
              Signup
            </button>

            <button className="login-btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </>
        ) : (
          <>
          <button
  className="login-btn primary"
  onClick={() => navigate("/dashboard")}
>
  My Activity
</button>
 
            <button className="profile-btn">
              <span className="profile-icon">👤</span>
              <span className="profile-text">{user.name}</span>
            </button>
           
            <button className="login-btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>

    </div>
  </nav>
);

  
};

export default Navbar;
