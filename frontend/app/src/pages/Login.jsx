// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return setError("Fill all fields");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      // 🔥 MOST IMPORTANT LINE
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/"); // HOME
      window.location.reload(); // 🔥 Navbar refresh
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

        {error && <p className="form-error">{error}</p>}

        <button className="btn-primary login-submit" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
