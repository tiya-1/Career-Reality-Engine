const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

exports.generateRoadmapAI = async (input, context) => {
  try {
    const prompt = `
You are a career roadmap generator.

STRICT RULES:
- Return ONLY valid JSON
- No markdown
- No explanation
- Format must be:

[
  { "week": 1, "title": "...", "description": "..." }
]

Career: ${input.careerName}
Duration: ${input.durationInMonths} months

Context:
${context}
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // ✅ working model
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const text = response.choices[0].message.content;

    // 🔥 CLEAN RESPONSE
    let clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const match = clean.match(/\[.*\]/s);

    if (!match) {
      console.error("RAW AI RESPONSE:", text);
      throw new Error("Invalid JSON from AI");
    }

    const milestones = JSON.parse(match[0]);

    return { milestones };

  } catch (err) {
    console.error("AI ERROR:", err.message);

    // ✅ FALLBACK (VERY IMPORTANT)
    return {
      milestones: Array.from({ length: input.durationInMonths * 4 }, (_, i) => ({
        week: i + 1,
        title: `Week ${i + 1} Task`,
        description: `Work on ${input.careerName} fundamentals`
      }))
    };
  }
};