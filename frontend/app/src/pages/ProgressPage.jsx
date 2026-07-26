import React, { useEffect, useState } from 'react';

const ProgressPage = () => {
  const [activePlan, setActivePlan] = useState(null);
  const [roadmapId, setRoadmapId] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch('http://localhost:5000/api/roadmap/latest', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (res.ok && data?.roadmap?.activePlan) {
        setActivePlan(data.roadmap.activePlan);
        setRoadmapId(data.roadmap._id);
      } else {
        setActivePlan(null);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  /* ================= TOGGLE ================= */
  const handleToggle = async (weekNumber, isLocked) => {
    if (isLocked) {
      alert("🔒 Complete previous week first!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        'http://localhost:5000/api/roadmap/update-progress',
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ roadmapId, week: weekNumber })
        }
      );

      if (res.ok) fetchProgress();

    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  /* ================= FEATURES ================= */

  // 🔥 STREAK
  const calculateStreak = () => {
    if (!activePlan) return 0;

    let streak = 0;
    for (let m of activePlan.milestones) {
      if (m.isCompleted) streak++;
      else break;
    }
    return streak;
  };

  const streak = calculateStreak();

  // 🎯 NEXT TASK
  const nextPending = activePlan?.milestones?.find(m => !m.isCompleted);

  /* ================= UI ================= */

  if (loading) {
    return <div style={{ paddingTop: '120px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!activePlan) {
    return <div style={{ paddingTop: '120px', textAlign: 'center' }}>No active plan found.</div>;
  }

  return (
    <div style={{ padding: '120px 20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '25px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          marginBottom: '30px'
        }}>
          <h1>{activePlan.selectedCareer}</h1>
          <p>Domain: {activePlan.domain}</p>

          <p style={{ fontWeight: 'bold', color: '#6366f1' }}>
            Progress: {activePlan.consistencyScore}%
          </p>

          {/* 🔥 STREAK */}
          <p style={{ color: '#f59e0b', fontWeight: 'bold' }}>
            🔥 Streak: {streak} weeks
          </p>

          {/* PROGRESS BAR */}
          <div style={{
            width: '100%',
            height: '10px',
            backgroundColor: '#f1f5f9',
            borderRadius: '10px',
            marginTop: '10px'
          }}>
            <div style={{
              width: `${activePlan.consistencyScore}%`,
              height: '100%',
              backgroundColor: '#6366f1'
            }} />
          </div>

          {/* 📊 MINI GRAPH */}
          <div style={{ display: 'flex', gap: '5px', marginTop: '15px' }}>
            {activePlan.milestones.map((m) => (
              <div
                key={m.week}
                style={{
                  width: '8px',
                  height: '30px',
                  borderRadius: '5px',
                  backgroundColor: m.isCompleted ? '#22c55e' : '#e2e8f0'
                }}
              />
            ))}
          </div>

          {/* 🎯 NEXT TASK */}
          {nextPending && (
            <div style={{
              backgroundColor: '#fff7ed',
              padding: '15px',
              borderRadius: '15px',
              marginTop: '15px'
            }}>
              🎯 Next Focus: Week {nextPending.week}
            </div>
          )}
        </div>

        {/* MILESTONES */}
        {activePlan.milestones.map((m, index) => {

          const prevCompleted = index === 0 || activePlan.milestones[index - 1]?.isCompleted;
          const isLocked = !prevCompleted && !m.isCompleted;

          return (
            <div key={m.week} style={{
              backgroundColor: isLocked ? '#f1f5f9' : 'white',
              padding: '25px',
              borderRadius: '20px',
              marginBottom: '20px',
              border: m.isCompleted
                ? '2px solid #22c55e'
                : isLocked
                  ? '1px dashed #cbd5e1'
                  : '1px solid #e2e8f0',
              opacity: isLocked ? 0.7 : 1
            }}>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>WEEK {m.week} {isLocked && "🔒"}</span>
                <span>{m.phase}</span>
              </div>

              <h3>{m.task}</h3>

              {!isLocked && <p>🚀 {m.description}</p>}

              {/* 🤖 FEEDBACK */}
              {m.isCompleted && (
                <div style={{
                  backgroundColor: '#ecfeff',
                  padding: '10px',
                  borderRadius: '10px'
                }}>
                  🤖 Great job! Keep going 🚀
                </div>
              )}

              <button
                onClick={() => handleToggle(m.week, isLocked)}
                disabled={isLocked}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: m.isCompleted
                    ? '#22c55e'
                    : isLocked
                      ? '#cbd5e1'
                      : '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px'
                }}
              >
                {m.isCompleted ? 'Completed ✓' : isLocked ? 'Locked' : 'Complete'}
              </button>

            </div>
          );
        })}

        {/* 🎉 COMPLETION */}
        {activePlan.consistencyScore === 100 && (
          <div style={{
            backgroundColor: '#ecfdf5',
            padding: '25px',
            borderRadius: '20px',
            textAlign: 'center',
            border: '2px solid #22c55e'
          }}>
            <h2>🎉 You completed your journey!</h2>

            <p>Ready for next step?</p>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>

              <button
                onClick={() => window.location.href = "/test"}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px'
                }}
              >
                🎯 Take Test
              </button>

              <button
                onClick={() => window.location.href = "/roadmap-result"}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#22c55e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px'
                }}
              >
                🔁 Explore Domains
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProgressPage;