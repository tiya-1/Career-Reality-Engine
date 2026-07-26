import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RoadmapDashboard.css";

const RoadmapDashboard = () => {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/roadmap/my", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        // ✅ FIX — correct property
        setRoadmaps(data.roadmaps || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  const openRoadmap = (id) => {
    navigate(`/roadmap-result/${id}`);
  };

  if (loading) return <p className="loading">Loading roadmaps...</p>;

  return (
    <div className="dashboard-container">
      <h1>My Activity</h1>

      {roadmaps.length === 0 ? (
        <div className="empty-state">
          <h2>No Roadmaps Yet 🚀</h2>
          <p>Start your career journey now!</p>
          <button 
            className="generate-btn"
            onClick={() => navigate("/roadmap-form")}
          >
            Get Started
          </button>
        </div>
      ) : (
        <div className="roadmap-grid">
          {roadmaps.map((r) => (
            <div
              key={r._id}
              className="roadmap-card"
              onClick={() => openRoadmap(r._id)}
            >
              {/* <h3>{r.inputSnapshot.goal}</h3> */}
              <h3>{r.inputSnapshot.goal || `Roadmap for ${r.inputSnapshot.interests[0]}`}</h3>

              <p>
                Domains: {r.domains.map((d) => d.domain).join(", ")}
              </p>

              <small>
                Created: {new Date(r.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoadmapDashboard;