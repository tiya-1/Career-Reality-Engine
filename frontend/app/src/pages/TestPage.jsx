import React, { useEffect, useState } from "react";

const TestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalize = (s) => (s || "").trim().toLowerCase();

  useEffect(() => {
    generateTest();
  }, []);

  const generateTest = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/roadmap/latest", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      const domain = data?.roadmap?.activePlan?.domain;
      const career = data?.roadmap?.activePlan?.selectedCareer;
      
      console.log("Selected Domain:", domain);
console.log("Selected Career:", career);

      if (!domain) {
        setLoading(false);
        return;
      }

      const testRes = await fetch(
        "http://localhost:5000/api/roadmap/test/generate",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ domain, career })
        }
      );

      const testData = await testRes.json();
      setQuestions(testData.questions || []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (qIndex, option) => {
    if (score !== null) return;

    setAnswers(prev => ({
      ...prev,
      [qIndex]: option
    }));
  };

  const handleSubmit = () => {
    let correct = 0;

    questions.forEach((q, i) => {
      if (normalize(answers[i]) === normalize(q.correctAnswer)) {
        correct++;
      }
    });

    setScore(correct);
  };

  if (loading) {
    return <div style={{ paddingTop: "120px", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "100px 20px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>🎯 Skill Test</h1>

      {questions.map((q, i) => (
        <div key={i} style={{
          background: "white",
          padding: "20px",
          marginBottom: "20px",
          borderRadius: "15px"
        }}>
          <h3>{q.question}</h3>

          {q.options.map((opt, idx) => {
            const isSelected = normalize(answers[i]) === normalize(opt);
            const isCorrect = normalize(q.correctAnswer) === normalize(opt);

            let bg = "#a6a8a7";

            if (score !== null) {
              if (isCorrect) bg = "#22c55e";
              else if (isSelected) bg = "#ef4444";
            } else if (isSelected) {
              bg = "#6366f1";
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(i, opt)}
                style={{
                  display: "block",
                  margin: "10px 0",
                  padding: "10px",
                  width: "100%",
                  backgroundColor: bg,
                  color: "white",
                  border: "none",
                  borderRadius: "10px"
                }}
              >
                {opt}
              </button>
            );
          })}

          {score !== null && (
            <p style={{ color: "#16a34a", marginTop: "10px" }}>
              ✅ Correct: {q.correctAnswer}
            </p>
          )}
        </div>
      ))}

      {score === null && (
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "10px"
          }}
        >
          Submit Test
        </button>
      )}

      {score !== null && (
        <div style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#a6a9a6",
          borderRadius: "15px",
          textAlign: "center"
        }}>
          <h2>Score: {score} / {questions.length}</h2>
        </div>
      )}
    </div>
  );
};

export default TestPage;