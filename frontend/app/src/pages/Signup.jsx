import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      return setError("Please fill all fields");
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // ✅ Store Token and User correctly
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
      window.location.reload(); 
    } catch (err) {
      setError("Server is not responding. Check your backend.");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>
        <form onSubmit={handleSignup}>
          <label>Name</label>
          <input name="name" type="text" onChange={handleChange} />
          
          <label>Email</label>
          <input name="email" type="email" onChange={handleChange} />
          
          <label>Password</label>
          <input name="password" type="password" onChange={handleChange} />
          
          {error && <p className="form-error">{error}</p>}
          
          <button type="submit" className="btn-primary signup-submit">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;