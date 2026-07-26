const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.generateTestAI = async ({ domain, career }, context) => {
  try {
    const prompt = `
You are an expert career evaluator.

Generate 5 MCQ questions for a student learning ${career} in ${domain}.

Use this knowledge:
${context}

Rules:
- Output ONLY valid JSON
- No markdown, no explanation
- Format:

{
  "questions": [
    {
      "question": "...",
      "options": ["A","B","C","D"],
      "answer": "..."
    }
  ]
}
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ updated working model
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let text = response.choices[0].message.content;

    // 🔥 CLEAN JSON (important fix)
    text = text.replace(/```json|```/g, "").trim();

    return JSON.parse(text);

  } catch (err) {
    console.error("TEST AI ERROR:", err);
    return { questions: [] };
  }
};