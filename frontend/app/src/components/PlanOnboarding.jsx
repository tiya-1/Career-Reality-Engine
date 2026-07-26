import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PlanOnboarding = ({ career, roadmapId, onClose, onPlanStarted }) => {
  const [duration, setDuration] = useState(6);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleStart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/roadmap/start-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roadmapId,
          careerName: career.name,
          domain: career.domain, // CRITICAL: Added domain for specific roadmap generation
          durationInMonths: parseInt(duration),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // First trigger the parent state update if needed
        if (onPlanStarted) onPlanStarted(data.activePlan);
        
        // Then redirect to the progress page we just added in App.js
        navigate("/progress"); 
      } else {
        alert(data.message || "Failed to start plan");
      }
    } catch (err) {
      alert("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const panelStyle = (color) => ({
    padding: '20px',
    borderRadius: '12px',
    borderLeft: `6px solid ${color}`,
    background: '#fefefe',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  });

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', borderRadius: '20px', maxWidth: '850px', width: '95%', padding: '40px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', right: '20px', top: '20px', border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
        
        <h2 style={{ marginBottom: '30px', color: '#1f2937' }}>Commitment Phase: {career.name}</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={panelStyle('#ef4444')}>
            <h4 style={{ margin: '0 0 10px 0', color: '#ef4444' }}>⚠️ 1. RISK ANALYSIS</h4>
            <p style={{ margin: 0, fontSize: '0.95rem', color: '#4b5563' }}>{career.riskAnalysis}</p>
          </div>

          <div style={panelStyle('#f59e0b')}>
            <h4 style={{ margin: '0 0 10px 0', color: '#f59e0b' }}>📉 2. FAILURE PATTERNS</h4>
            <p style={{ margin: 0, fontSize: '0.95rem', color: '#4b5563' }}>{career.failurePatterns}</p>
          </div>

          <div style={panelStyle('#3b82f6')}>
            <h4 style={{ margin: '0 0 10px 0', color: '#3b82f6' }}>🤖 3. AI MENTOR MESSAGE</h4>
            <p style={{ margin: 0, fontSize: '0.95rem', fontStyle: 'italic', color: '#4b5563' }}>{career.aiMentorship}</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <p style={{ fontWeight: 'bold', color: '#374151', marginBottom: '10px' }}>How many months do you want to commit to this goal?</p>
          <select 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)} 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #d1d5db', outline: 'none' }}
          >
            <option value={3}>3 Months (Fast Track)</option>
            <option value={6}>6 Months (Standard)</option>
            <option value={12}>12 Months (Deep Master)</option>
          </select>

          <button 
            onClick={handleStart} 
            disabled={loading} 
            style={{ 
              width: '100%', 
              padding: '18px', 
              background: loading ? '#9ca3af' : '#6366f1', 
              color: 'white', 
              border: 'none', 
              borderRadius: '12px', 
              fontWeight: 'bold', 
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              transition: 'background 0.2s'
            }}
          >
            {loading ? "Generating Your Career Path..." : "Begin Step-by-Step Journey"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanOnboarding;