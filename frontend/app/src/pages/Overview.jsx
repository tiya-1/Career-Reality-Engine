// Overview.jsx
import React from "react";
import "./Overview.css";
import { FiTarget, FiUsers, FiShield } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineSync } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Overview = () => {
  const navigate = useNavigate();
  return (
    <div className="overview">
       <div className="navbar-spacer"></div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Career Planning Built for Real Life</h1>
        <p>
          Career Reality Engine is a constraint-based decision support system
          that helps students plan careers realistically by accounting for
          skills, time, consistency, risk, and uncertainty.
        </p>
        <div className="hero-buttons">
           <button
    className="btn-primary"
    onClick={() => navigate("/Roadmap-Form")}
  >
    See How It Works
  </button>
          <button
    className="btn-primary"
    onClick={() => navigate("/Features")}
  >
    Explore Features
  </button>
        </div>
      </section>

      {/* Core Problem Section */}
      <section className="core-problem">
        <h2>The Career Planning Gap</h2>
        <ul>
          <li>Generic roadmaps assume ideal conditions</li>
          <li>Students lack feedback loops</li>
          <li>Failure data is invisible</li>
          <li>Life disruptions are ignored</li>
        </ul>
        <pre>
Motivation-based advice ❌
Constraint-based planning ✅
        </pre>
      </section>

      {/* Philosophy / Pillars */}
      <section className="pillars">
        <h2>What Makes Career Reality Engine Different</h2>
        <div className="pillar-cards">
          <div className="card">
            <AiOutlineCheckCircle className="icon"/>
            <h3>Reality-First Design</h3>
            <p>Plans adapt to real constraints, not ideal scenarios</p>
          </div>
          <div className="card">
            <FiTarget className="icon"/>
            <h3>Risk-Aware Guidance</h3>
            <p>Every path shows trade-offs and probability of failure</p>
          </div>
          <div className="card">
            <FiShield className="icon"/>
            <h3>Evidence-Based Progress</h3>
            <p>Progress is validated through testing, not assumptions</p>
          </div>
          <div className="card">
            <AiOutlineSync className="icon"/>
            <h3>Adaptive, Not Linear</h3>
            <p>Roadmaps change when life changes</p>
          </div>
        </div>
      </section>

      {/* System Thinking */}
      <section className="system-thinking">
        <h2>How the System Thinks</h2>
        <pre>
User Constraints → Feasible Paths → Risk Evaluation
       ↓
Progress & Testing → Recalibration → Updated Roadmap
        </pre>
        <p>Continuous evaluation, feedback loops, decision support, not guarantees.</p>
      </section>

      {/* Audience */}
      <section className="audience">
        <h2>Who This Is For</h2>
        <div className="audience-cards">
          <div className="card">Tier-2 / Tier-3 college students</div>
          <div className="card">Career switchers with limited time</div>
          <div className="card">Students overwhelmed by options</div>
          <div className="card">Institutions seeking realistic guidance</div>
        </div>
      </section>

      {/* Ethics */}
      <section className="ethics">
        <h2>Ethics & Transparency</h2>
        <ul>
          <li>No placement promises</li>
          <li>Anonymous data usage</li>
          <li>Risk ≠ failure</li>
          <li>Student mental-health–safe design</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="overview-cta">
        <h2>Understand Your Career Options Before Investing Years</h2>
         <button
    className="btn-primary"
    onClick={() => navigate("/Roadmap-Form")}
  >
    Generate My Career Plan
  </button>
        <button
    className="btn-primary"
    onClick={() => navigate("/Features")}
  >
    View Feature Breakdown
  </button>
      </section>
    </div>
  );
};

export default Overview;
