import React, { useState } from "react";
import "./PricingPage.css";

const pricingTiers = [
  {
    name: "Free — Reality Starter",
    color: "green",
    price: "Free",
    description: "Best for exploration",
    features: [
      "Career overview",
      "Risk indicators",
      "Basic roadmap",
      "Limited peer insights",
    ],
  },
  {
    name: "Pro — Serious Planner",
    color: "blue",
    price: "₹299–₹499/month or college demo",
    description: "",
    features: [
      "Full personalized roadmap",
      "Failure pattern analytics",
      "Micro-tests & skill validation",
      "Progress & life-event tracking",
      "Roadmap recalibration",
    ],
  },
  {
    name: "Institutional / Campus License",
    color: "purple",
    price: "Custom",
    description: "For colleges & training centers",
    features: [
      "Admin dashboard",
      "Batch analytics",
      "Anonymous cohort insights",
      "Performance heatmaps",
    ],
  },
];

const faqs = [
  {
    question: "Is this AI-generated advice?",
    answer: "Yes, it is AI-assisted guidance based on data and trends. Human validation is involved.",
  },
  {
    question: "Can this guarantee placement?",
    answer: "No, this tool provides guidance and insights, but cannot guarantee placements.",
  },
  {
    question: "How is data anonymized?",
    answer: "All personal data is anonymized and used only for aggregate analytics and insights.",
  },
  {
    question: "Is this suitable for Tier-3 colleges?",
    answer: "Yes, our tool is designed to support all tiers of educational institutions.",
  },
];

const PricingPage = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [showAskBox, setShowAskBox] = useState(false);
  const [question, setQuestion] = useState("");

  const toggleFAQ = (idx) => {
    setActiveFAQ(activeFAQ === idx ? null : idx);
  };

  const handleAskQuestion = () => {
    if (question.trim()) {
      alert("Your question has been submitted!");
      setQuestion("");
      setShowAskBox(false);
    }
  };

  return (
    <div className="pricing-page">
      <div className="navbar-spacer"></div>

      {/* Hero Section */}
      <section className="pricing-hero">
        <h1>Realistic, Ethical, and Scalable Pricing</h1>
        <p>Education guidance should be accessible — advanced personalization requires infrastructure.</p>
      </section>

      {/* Pricing Tiers */}
      <section className="pricing-tiers-section">
        <h2>Pricing Tiers</h2>
        <div className="pricing-cards">
          {pricingTiers.map((tier, idx) => (
            <div key={idx} className={`tier-card ${tier.color}`}>
              <h3>{tier.name}</h3>
              <p className="tier-price">{tier.price}</p>
              {tier.description && <p className="tier-desc">{tier.description}</p>}
              <ul>
                {tier.features.map((feature, fidx) => (
                  <li key={fidx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Ethical Disclaimer */}
      <section className="pricing-disclaimer">
        <h2>Ethical Disclaimer</h2>
        <ul>
          <li>No job guarantees</li>
          <li>Risk ≠ failure</li>
          <li>Tool supports decision-making, not promises</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="pricing-faq">
        <h2>Frequently Asked Questions</h2>
        <ul>
          {faqs.map((item, idx) => (
            <li key={idx}>
              <div
                className="faq-question"
                onClick={() => toggleFAQ(idx)}
                style={{ cursor: "pointer", fontWeight: 600 }}
              >
                {item.question} <span>{activeFAQ === idx ? "▲" : "▼"}</span>
              </div>
              {activeFAQ === idx && (
                <div className="faq-answer" style={{ marginTop: "8px", fontStyle: "italic" }}>
                  {item.answer}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Ask Question Button Below FAQs */}
        {/* {showAskBox ? (
          <div className="ask-box" style={{ marginTop: "20px" }}>
            <textarea
              placeholder="Type your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={{ width: "100%", minHeight: "60px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
            />
            <div style={{ marginTop: "8px" }}>
              <button
                className="show-ask-btn"
                onClick={handleAskQuestion}
                style={{ marginRight: "8px" }}
              >
                Submit
              </button>
              <button onClick={() => setShowAskBox(false)} style={{ padding: "8px 12px" }}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            className="show-ask-btn"
            style={{ marginTop: "20px" }}
            onClick={() => setShowAskBox(true)}
          >
            Ask a Question
          </button>
        )} */}
      </section>
    </div>
  );
};

export default PricingPage;
