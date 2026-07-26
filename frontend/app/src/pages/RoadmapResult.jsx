import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import PlanOnboarding from "../components/PlanOnboarding"; 
import "./RoadmapResult.css";

/* ================= CAREER CARD ================= */
const CareerCard = ({ career, onSelect }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className={`card ${career.category?.toLowerCase()}`}
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
      onClick={() => onSelect(career)} 
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      <h3>{career.name}</h3>

      {/* FIX: Changed feasibility to score to match backend */}
      <p><strong>Feasibility:</strong> {career.score}%</p>
      
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${career.score}%` }}
        />
      </div>

      {showInfo && (
        <div className="card-info-popup" style={{ zIndex: 10 }}>
          <h4>Reality Check</h4>
          <p style={{ fontSize: '0.85rem', color: '#ef4444' }}>
            <strong>Risk:</strong> {career.riskAnalysis}
          </p>
          <p style={{ fontSize: '0.85rem', color: '#f59e0b', marginTop: '5px' }}>
            <strong>Common Failures:</strong> {career.failurePatterns}
          </p>
          <hr />
          <p style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>
            {career.aiMentorship}
          </p>
          <p className="click-hint" style={{ marginTop: '10px', color: '#6366f1', fontWeight: 'bold' }}>
            Click to start journey
          </p>
        </div>
      )}
    </div>
  );
};

/* ================= MAIN RESULT ================= */
const RoadmapResult = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [domains, setDomains] = useState([]);
  const [roadmapId, setRoadmapId] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const url = id
      ? `http://localhost:5000/api/roadmap/${id}`
      : `http://localhost:5000/api/roadmap/latest`;

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data?.roadmap) {
          setDomains(data.roadmap.domains || []);
          setRoadmapId(data.roadmap._id);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Roadmap fetch error:", err);
        setLoading(false);
      });
  }, [navigate, id]);

  if (loading) return <div style={{padding: "100px", textAlign: "center"}}>Analyzing your future...</div>;

  return (
    <div className="roadmap-result" style={{ paddingTop: '80px' }}>
      <section className="hero">
        <h1>Career Reality Snapshot</h1>
        <p>Direct analysis of your path. No sugarcoating.</p>
      </section>

      {domains.length > 0 ? (
        domains.map((domainBlock, idx) => (
          <section key={idx} className="domain-section">
            <h2 className="domain-header">{domainBlock.domain}</h2>

            <h3 className="section-title feasible">✅ Available Paths</h3>
            <div className="features-cards" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {domainBlock.careers.map((career, i) => (
                <CareerCard key={i} career={career} onSelect={setSelectedCareer} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <section className="empty-state">
          <p>No results found. Try generating a new roadmap with different domains.</p>
        </section>
      )}

      <section className="reality-box" style={{ margin: '40px 20px', padding: '20px', backgroundColor: '#fff1f2', borderRadius: '15px', border: '1px solid #fecdd3' }}>
        <h3 style={{ color: '#be123c' }}><FaExclamationTriangle /> Warning: Consistency Required</h3>
        <ul style={{ color: '#9f1239' }}>
          <li>Low consistency reduces feasibility sharply.</li>
          <li>Each "Mission" must be completed in sequence.</li>
        </ul>
      </section>

      {selectedCareer && (
        <PlanOnboarding 
          career={selectedCareer}
          roadmapId={roadmapId}
          onClose={() => setSelectedCareer(null)}
          onPlanStarted={() => {
            setSelectedCareer(null);
            navigate("/progress"); 
          }}
        />
      )}
    </div>
  );
};

export default RoadmapResult;