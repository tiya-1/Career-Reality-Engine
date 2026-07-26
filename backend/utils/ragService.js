// backend/utils/ragService.js

// ================= SIMPLE FREE RAG =================

// 🔹 In-memory knowledge base (you can expand this anytime)
const docs = [
  "Frontend developer roadmap includes HTML, CSS, JavaScript, React, Git, APIs, projects, internships, deployment.",
  "Backend developer roadmap includes Node.js, Express, MongoDB, authentication, REST APIs, security, deployment.",
  "Full stack developer requires frontend + backend + system design + real-world projects.",
  "Data scientist roadmap includes Python, statistics, machine learning, pandas, numpy, visualization, real datasets.",
  "UI UX designer requires Figma, design systems, user research, case studies, portfolio building.",
  "Software engineer requires DSA, system design, projects, internships, problem solving, coding practice.",
  "AI ML engineer requires Python, machine learning, deep learning, neural networks, projects, deployment.",
];

// 🔹 Initialize RAG (just for consistency)
exports.initRAG = async () => {
  console.log("✅ Free RAG initialized (no external API)");
};

// 🔹 Basic keyword-based retrieval
exports.getContext = async (query) => {
  try {
    if (!query) return docs.join("\n");

    const words = query.toLowerCase().split(" ");

    // Find relevant docs
    const relevantDocs = docs.filter(doc =>
      words.some(word => doc.toLowerCase().includes(word))
    );

    // If nothing matches → fallback to all docs
    if (relevantDocs.length === 0) {
      return docs.join("\n");
    }

    return relevantDocs.join("\n");

  } catch (err) {
    console.error("RAG ERROR:", err);
    return docs.join("\n"); // safe fallback
  }
};