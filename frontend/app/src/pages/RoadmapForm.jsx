import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RoadmapForm.css";

const RoadmapForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    educationLevel: "",
    comfortLevel: "",
    interests: [],
    goal: "",
    studyTime: "",
    resources: [],
    learningStyle: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckbox = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  // ===============================
  // 🔥 INTEREST → DOMAIN MAP (FIX)
  // ===============================
  // const interestToDomainMap = {
  //   "Tech": ["Tech"],
  //   "Mathematics & Analytics": ["Tech", "Analytics"],
  //   "Design & Creative": ["Creative"],
  //   "Business & Management": ["Business"],
  //   "Commerce / Finance": ["Finance"],
  //   "Healthcare / Medical": ["Healthcare"],
  //   "Government Exams": ["Government"],
  //   "Alternative": ["Alternative"],
  //   "Unsure": []
  // };
// 🔥 Updated interestToDomainMap

const interestToDomainMap = {
  "Tech": ["Tech"],
  "Mathematics & Analytics": ["Mathematics & Analytics"],
  "Design & Creative": ["Design & Creative"],
  "Business & Management": ["Business & Management"],
  "Commerce / Finance": ["Commerce / Finance"],
  "Healthcare / Medical": ["Healthcare / Medical"],
  "Government Exams": ["Government Exams"],
  "Alternative": ["Alternative"],
  "Space / Astronomy": ["Space / Astronomy"],
  "Environment / Sustainability": ["Environment / Sustainability"],
  "Agriculture / Food Science": ["Agriculture / Food Science"],
  "Law / Judiciary": ["Law / Judiciary"],
  "Media / Journalism / Communication": ["Media / Journalism / Communication"],
  "Sports / Fitness / Coaching": ["Sports / Fitness / Coaching"],
  "Emerging Technology / AI / Robotics": ["Emerging Technology / AI / Robotics"],
  "Defense / Cybersecurity / Strategic Studies": ["Defense / Cybersecurity / Strategic Studies"],
  "Study-Abroad / Foreign Exams / Global Education": ["Study-Abroad / Foreign Exams / Global Education"],
  "Unsure": []
};
  // ===============================
  // ✅ FINAL FIXED SUBMIT
  // ===============================
  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.age ||
      !formData.educationLevel ||
      !formData.comfortLevel ||
      formData.interests.length === 0 ||
      !formData.studyTime ||
      !formData.learningStyle
    ) {
      setError("Please complete all required fields.");
      return;
    }

    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // 🔥 BUILD selectedDomains (CORE FIX)
    const selectedDomains = [
      ...new Set(
        formData.interests.flatMap(
          (i) => interestToDomainMap[i] || []
        )
      )
    ];

    const payload = {
      ...formData,
      selectedDomains
    };
    console.log("Payload:", payload);

    try {
      const res = await fetch("http://localhost:5000/api/roadmap/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

  const data = await res.json();

if (!res.ok) {
  setError(data.message || "Roadmap generation failed");
  return;
}

// ✅ IMPORTANT FIX
navigate(`/roadmap-result/${data.roadmap._id}`);

    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <button className="close-btn" onClick={() => navigate("/")}>✕</button>
        <h2 className="form-title">Create Your Personalized Roadmap</h2>

        {step === 1 && (
          <>
            <label>Full Name *</label>
            <input name="name" value={formData.name} onChange={handleChange} />

            <label>Age *</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />

            <label>Education Level *</label>
            <select
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Below Class 11</option>
              <option>Class 11–12</option>
              <option>College</option>
              <option>Dropper / Gap Year</option>
            </select>
          </>
        )}

        {step === 2 && (
          <>
            <label>Academic Comfort Level *</label>
            <div className="radio-group">
              {["Beginner", "Average", "Strong"].map((lvl) => (
                <label key={lvl}>
                  <input
                    type="radio"
                    name="comfortLevel"
                    value={lvl}
                    checked={formData.comfortLevel === lvl}
                    onChange={handleChange}
                  />{" "}
                  {lvl}
                </label>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <label>Interests *</label>
            <div className="checkbox-group">
              {[
  "Tech",
  "Mathematics & Analytics",
  "Design & Creative",
  "Business & Management",
  "Commerce / Finance",
  "Healthcare / Medical",
  "Government Exams",
  "Alternative",
  "Space / Astronomy",
  "Environment / Sustainability",
  "Agriculture / Food Science",
  "Law / Judiciary",
  "Media / Journalism / Communication",
  "Sports / Fitness / Coaching",
  "Emerging Technology / AI / Robotics",
  "Defense / Cybersecurity / Strategic Studies",
  "Study-Abroad / Foreign Exams / Global Education",
  "Unsure"
].map((i) => (
                <label key={i}>
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(i)}
                    onChange={() => handleCheckbox("interests", i)}
                  />{" "}
                  {i}
                </label>
              ))}
            </div>

            {/* <label>Dream Goal (Optional)</label>
            <input name="goal" value={formData.goal} onChange={handleChange} /> */}
          </>
        )}

        {step === 4 && (
          <>
            <label>Daily Study Time *</label>
            <select
              name="studyTime"
              value={formData.studyTime}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>&lt; 1 hour</option>
              <option>1–2 hours</option>
              <option>2–4 hours</option>
              <option>4+ hours</option>
            </select>

            <label>Resources Available</label>
            <div className="checkbox-group">
              {["Smartphone", "Laptop", "Internet", "Books"].map((r) => (
                <label key={r}>
                  <input
                    type="checkbox"
                    checked={formData.resources.includes(r)}
                    onChange={() => handleCheckbox("resources", r)}
                  />{" "}
                  {r}
                </label>
              ))}
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <label>Learning Style *</label>
            <div className="radio-group">
              {["Visual", "Reading", "Practice-based", "Mixed"].map((style) => (
                <label key={style}>
                  <input
                    type="radio"
                    name="learningStyle"
                    value={style}
                    checked={formData.learningStyle === style}
                    onChange={handleChange}
                  />{" "}
                  {style}
                </label>
              ))}
            </div>
          </>
        )}

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions" style={{ display: "flex", justifyContent: "space-between" }}>
          {step > 1 && <button onClick={() => setStep(step - 1)}>Back</button>}
          {step < 5 && (
            <button className="btn-primary" onClick={() => setStep(step + 1)}>
              Next
            </button>
          )}
          {step === 5 && (
            <button className="btn-primary" onClick={handleSubmit}>
              Start My Plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadmapForm;
