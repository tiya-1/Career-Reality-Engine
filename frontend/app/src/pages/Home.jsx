// src/pages/Home.jsx
import React from "react";
import {
  FaMap,
  FaUsers,
  FaChartLine,
  FaCheckCircle,
  FaTasks,
  FaLightbulb,
} from "react-icons/fa";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
   const navigate = useNavigate();
  return (
    <div className="home">
      <div className="home-container">

        {/* Background Gradient */}
        <div className="background-gradient"></div>

        {/* Hero Section */}
        <section className="hero">
          <h1>
            <span className="gradient-text">Plan Smart.</span>
            <br />
            <span className="hero-subtext">Achieve Real.</span>
          </h1>
          <p>
            Personalized career roadmaps, progress tracking, consistency guidance,
            and adaptive testing — turn your skills and effort into real results.
          </p>
          <button className="cta-btn btn-primary"  onClick={() => navigate("/roadmap-form")}>Get Started</button>
        </section>

        {/* Reality Box */}
        <section className="reality-box">
          ⚠️ PathFinder does not promise jobs or shortcuts. It helps you track
          progress, assess risks, and make informed career decisions based on real
          data.
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>Key Features</h2>
          <div className="features-cards">
            <div className="card">
              <FaMap className="card-icon" />
              <h3>Personalized Roadmaps</h3>
              <p>Career paths based on your profile and constraints.</p>
            </div>
            <div className="card">
              <FaLightbulb className="card-icon" />
              <h3>Failure Pattern Insights</h3>
              <p>Learn from mistakes of similar users.</p>
            </div>
            <div className="card">
              <FaUsers className="card-icon" />
              <h3>Peer Guidance</h3>
              <p>Structured discussion with similar profiles.</p>
            </div>
            <div className="card">
              <FaCheckCircle className="card-icon" />
              <h3>Adaptive Testing</h3>
              <p>Smart micro-tests adjust your roadmap.</p>
            </div>
            <div className="card">
              <FaTasks className="card-icon" />
              <h3>Progress Tracker</h3>
              <p>Track milestones and real-life progress.</p>
            </div>
            <div className="card">
              <FaChartLine className="card-icon" />
              <h3>Analytics Dashboard</h3>
              <p>Visual insights for growth and risks.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-logo">PathFinder</div>
            <div className="footer-links">
              <span>Resources</span>
              <span>FAQ</span>
              <span>Support</span>
            </div>
            <div className="footer-contact">contact@pathfinder.com</div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Home;
