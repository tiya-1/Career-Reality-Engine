import React from "react";
import "./Features.css";
import { useNavigate } from "react-router-dom";

const featureData = [
  {
    title: "Constraint-Based Career Roadmap Generator",
    description: `Inputs: Education & background, Skill level, Daily availability, Consistency & finances
Outputs: Multiple feasible career paths, Milestones with difficulty, Opportunity cost indicators
System Behavior: Rebuilds roadmap when constraints change`,
    icon: "🔹",
  },
  {
    title: "Risk & Failure Pattern Engine",
    description: `Analyzes: Anonymous failure stories, Drop-off patterns, Overcommitment signals
User sees: Risk probability, Common failure reasons, Early warning indicators`,
    icon: "🔹",
  },
  {
    title: "Personalized Skill Testing",
    description: `Capabilities: Micro-quizzes per milestone, Coding tasks / MCQs, Mastery level tracking
Impact: Low scores → risk increases, High scores → feasibility improves`,
    icon: "🔹",
  },
  {
    title: "Adaptive Progress & Life-Event Tracking",
    description: `Tracks: Weekly goals, Missed milestones, Life interruptions
System Response: Recalculates roadmap, Suggests recovery strategies, Prevents burnout`,
    icon: "🔹",
  },
  {
    title: "Structured Peer Insights",
    description: `Design: Anonymous, Prompt-based, Matched by profile
Focus: Mistakes, Reality checks, Lessons learned`,
    icon: "🔹",
  },
  {
    title: "Analytics & Dashboard",
    description: `Visualizes: Skill mastery, Progress trends, Risk heatmaps, Peer insight summaries`,
    icon: "🔹",
  },
];

const Features = () => {
  const navigate = useNavigate();
  return (
    <div className="features">
       <div className="navbar-spacer"></div>

      {/* Hero Section */}
      <section className="hero">
        <h1>Tools That Adapt to Your Reality</h1>
        <p>Each feature works together to build a realistic, adaptive career plan.</p>
        <div className="hero-buttons">
           <button className="btn-primary" onClick={() => navigate("/roadmap-form")}>
          Get Started
        </button>
          <button className="btn-primary btn-secondary" onClick={() => navigate("/Pricing")}>
          View Pricing
        </button>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="feature-cards">
        {featureData.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>

      {/* System Thinking / Flow */}
      <section className="system-thinking">
        <h2>How Features Work Together</h2>
        <div className="flow-line">
          Roadmap → Test → Progress → Risk → Adjustment
        </div>
      </section>

      {/* CTA Section */}
      <section className="overview-cta">
        <h2>Explore Your Personalized Career Path</h2>
        <button className="btn-primary" onClick={() => navigate("/roadmap-form")}>
          Get Started
        </button>
         <button className="btn-primary btn-secondary" onClick={() => navigate("/Pricing")}>
          View Pricing
        </button>
      </section>

    </div>
  );
};

export default Features;
