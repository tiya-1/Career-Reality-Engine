const Roadmap = require("../models/Roadmap");
const careers = require("../utils/CareerData");
const Groq = require("groq-sdk");

const { generateRoadmapAI } = require("../utils/RoadmapEngine");
const { getContext } = require("../utils/ragService");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

/* ================= GENERATE CAREER OPTIONS ================= */
exports.generateRoadmap = async (req, res) => {
  try {
    const userId = req.user.id;
    const { selectedDomains = [], learningStyle } = req.body;

    // const fragments = {
    //   "Tech": { sub: ["stack obsolescence"], ctx: ["scaling phases"], fail: "Ignoring documentation." },
    //   "Mathematics & Analytics": { sub: ["algorithmic bias"], ctx: ["validation"], fail: "Poor data cleaning." },
    //   "Design & Creative": { sub: ["market saturation"], ctx: ["portfolio"], fail: "Ignoring feedback." },
    //   "Business & Management": { sub: ["economic flux"], ctx: ["forecasting"], fail: "Poor communication." },
    //   "Commerce / Finance": { sub: ["regulatory flux"], ctx: ["auditing"], fail: "Missing updates." },
    //   "Healthcare / Medical": { sub: ["burnout"], ctx: ["triage"], fail: "Fatigue." },
    //   "Alternative": { sub: ["instability"], ctx: ["clients"], fail: "No networking." }
    // };
    const fragments = {
  Tech: {
    sub: ["Rapid technology changes", "High competition"],
    ctx: ["Build projects and practice coding"],
    fail: "Ignoring practical development."
  },

  Maths: {
    sub: ["Complex concepts"],
    ctx: ["Practice numerical problems"],
    fail: "Weak fundamentals."
  },

  Design: {
    sub: ["Changing design trends"],
    ctx: ["Build a strong portfolio"],
    fail: "Ignoring feedback."
  },

  Business: {
    sub: ["Economic fluctuations"],
    ctx: ["Develop leadership skills"],
    fail: "Poor planning."
  },

  Commerce: {
    sub: ["Changing regulations"],
    ctx: ["Master accounting concepts"],
    fail: "Weak financial knowledge."
  },

  Healthcare: {
    sub: ["Long study duration"],
    ctx: ["Focus on patient care"],
    fail: "Lack of practical training."
  },

  Government: {
    sub: ["Very high competition"],
    ctx: ["Practice previous year papers"],
    fail: "Irregular preparation."
  },

  Mixed: {
    sub: ["Career uncertainty"],
    ctx: ["Explore different fields"],
    fail: "Lack of focus."
  },

  "Space / Astronomy": {
    sub: ["Limited opportunities"],
    ctx: ["Strengthen Physics and Mathematics"],
    fail: "Weak research skills."
  },

  "Environment / Sustainability": {
    sub: ["Policy changes"],
    ctx: ["Learn environmental regulations"],
    fail: "Ignoring fieldwork."
  },

  "Agriculture / Food Science": {
    sub: ["Climate challenges"],
    ctx: ["Stay updated with modern farming"],
    fail: "Ignoring practical exposure."
  },

  "Law / Judiciary": {
    sub: ["Long preparation"],
    ctx: ["Study landmark cases"],
    fail: "Poor legal reasoning."
  },

  "Media / Journalism / Communication": {
    sub: ["Changing media trends"],
    ctx: ["Improve communication skills"],
    fail: "Poor writing."
  },

  "Sports / Fitness / Coaching": {
    sub: ["Injury risk"],
    ctx: ["Maintain consistent training"],
    fail: "Ignoring fitness."
  },

  "Emerging Technology / AI / Robotics": {
    sub: ["Fast-changing technology"],
    ctx: ["Keep learning new AI tools"],
    fail: "Not updating skills."
  },

  "Defense / Cybersecurity / Strategic Studies": {
    sub: ["Rapidly evolving threats"],
    ctx: ["Practice security labs"],
    fail: "Ignoring fundamentals."
  },

  "Study-Abroad / Foreign Exams / Global Education": {
    sub: ["Visa and admission competition"],
    ctx: ["Prepare language tests early"],
    fail: "Late application planning."
  }
};

    const getHash = (s) =>
      s.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);

      console.log("Selected Domains:", selectedDomains);
console.log("Career Domains:", [...new Set(careers.map(c => c.domain))]);

const careerDomainMap = {
  "Tech": "Tech",
  "Mathematics & Analytics": "Maths",
  "Design & Creative": "Design",
  "Business & Management": "Business",
  "Commerce / Finance": "Commerce",
  "Healthcare / Medical": "Healthcare",
  "Government Exams": "Government",
  "Alternative": "Mixed",
  "Space / Astronomy": "Space / Astronomy",
  "Environment / Sustainability": "Environment / Sustainability",
  "Agriculture / Food Science": "Agriculture / Food Science",
  "Law / Judiciary": "Law / Judiciary",
  "Media / Journalism / Communication": "Media / Journalism / Communication",
  "Sports / Fitness / Coaching": "Sports / Fitness / Coaching",
  "Emerging Technology / AI / Robotics": "Emerging Technology / AI / Robotics",
  "Defense / Cybersecurity / Strategic Studies": "Defense / Cybersecurity / Strategic Studies",
  "Study-Abroad / Foreign Exams / Global Education": "Study-Abroad / Foreign Exams / Global Education"
};

const normalizedDomains = selectedDomains.map(
  domain => careerDomainMap[domain] || domain
);
    // const filteredCareers = careers.filter(c =>
    //   selectedDomains.some(sel =>
    //     c.domain.toLowerCase().includes(sel.toLowerCase())
    //   )
    // );
    const filteredCareers = careers.filter(c =>
  normalizedDomains.includes(c.domain)
);

    const domainMap = {};

    filteredCareers.forEach((career, index) => {
      const h = Math.abs(getHash(career.name) + index);
      const dom = fragments[career.domain] || fragments["Alternative"];
      const score = 45 + (h % 40);

      if (!domainMap[career.domain]) domainMap[career.domain] = [];

      domainMap[career.domain].push({
        name: career.name,
        domain: career.domain,
        score,
        category: "FEASIBLE",
        riskAnalysis: `Risk of ${dom.sub[h % dom.sub.length]}`,
        failurePatterns: dom.fail,
        aiMentorship: `Focus on ${dom.ctx[0]}`
      });
    });

    const domains = Object.keys(domainMap).map(d => ({
      domain: d,
      careers: domainMap[d]
    }));

    const roadmap = await Roadmap.create({
      userId,
      inputSnapshot: req.body,
      domains
    });

    res.status(201).json({ roadmap });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Generation failed" });
  }
};

/* ================= START PLAN ================= */
exports.startPlan = async (req, res) => {
  try {
    const { roadmapId, careerName, domain, durationInMonths } = req.body;

    const roadmap = await Roadmap.findOne({
      _id: roadmapId,
      userId: req.user.id
    });

    if (!roadmap) return res.status(404).json({ message: "Not found" });

    const context = await getContext(careerName);

    const aiData = await generateRoadmapAI(
      { careerName, durationInMonths },
      context
    );

    // ✅ SAFE FALLBACK
    if (!aiData || !aiData.milestones) {
      return res.status(500).json({
        message: "AI roadmap failed"
      });
    }

    roadmap.activePlan = {
      selectedCareer: careerName,
      domain,
      durationInMonths,
      startDate: new Date(),
      milestones: aiData.milestones.map((m, i) => ({
        week: m.week || i + 1,
        task: m.task || "Learning Task",
        description: m.description || "",
        phase: m.phase || "Learning",
        isCompleted: false,
        completedAt: null
      })),
      consistencyScore: 0
    };

    await roadmap.save();

    res.json({ activePlan: roadmap.activePlan });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Start plan failed" });
  }
};

/* ================= UPDATE PROGRESS ================= */
exports.updateProgress = async (req, res) => {
  try {
    const { roadmapId, week } = req.body;

    const roadmap = await Roadmap.findOne({
      _id: roadmapId,
      userId: req.user.id
    });

    if (!roadmap) return res.status(404).json({ message: "Not found" });

    const milestones = roadmap.activePlan.milestones;
    const index = milestones.findIndex(m => m.week === week);

    if (index === -1) return res.status(404).json({ message: "Week not found" });

    if (!milestones[index].isCompleted && index > 0 && !milestones[index - 1].isCompleted) {
      return res.status(400).json({ message: "Complete previous week first" });
    }

    milestones[index].isCompleted = !milestones[index].isCompleted;
    milestones[index].completedAt = milestones[index].isCompleted ? new Date() : null;

    const completed = milestones.filter(m => m.isCompleted).length;

    roadmap.activePlan.consistencyScore =
      Math.round((completed / milestones.length) * 100);

    await roadmap.save();

    res.json({ success: true, activePlan: roadmap.activePlan });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};

/* ================= GENERATE TEST ================= */
exports.generateTest = async (req, res) => {
  try {
    const { domain, career } = req.body;

    if (!domain) {
      return res.status(400).json({ message: "Domain required" });
    }

    const context = await getContext(domain);
    const careerInfo = careers.find(c => c.name === career);

   console.log("Career Info:", careerInfo);

//     const prompt = `
// You are an expert test generator.

// Generate 5 HIGH-QUALITY MCQ questions STRICTLY for ${career || domain}.

// Rules:
// - Questions must be from THIS DOMAIN ONLY (no other fields)
// - Each question must have:
//   - question (clear and meaningful)
//   - 4 realistic options
//   - correctAnswer MUST EXACTLY MATCH one option

// Return ONLY JSON:
// {
//   "questions": [
//     {
//       "question": "....",
//       "options": ["....", "....", "....", "...."],
//       "correctAnswer": "exact matching option text"
//     }
//   ]
// }

// Context:
// ${context}
// `;
const prompt = `
You are an expert examination paper setter.

Career:
${careerInfo?.name}

Domain:
${careerInfo?.domain}

Description:
${careerInfo?.description}

Suitable Interests:
${careerInfo?.suitableInterests?.join(", ")}

Difficulty:
${careerInfo?.difficulty}

Generate exactly 5 MCQs ONLY for this career.

Do NOT generate questions from any unrelated field.

Return ONLY JSON:

{
  "questions": [
    {
      "question": "",
      "options": ["", "", "", ""],
      "correctAnswer": ""
    }
  ]
}

Additional Context:
${context}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5
    });

    let text = completion.choices[0].message.content;

    // remove ```json
    text = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(text);

    res.json(parsed);

  } catch (err) {
    console.error("TEST ERROR:", err);

    // ✅ SAFE FALLBACK
    res.json({
      questions: [
        {
          question: `What is a key concept in ${req.body.domain}?`,
          options: [
            "Fundamental principle",
            "Irrelevant concept",
            "Random idea",
            "Unrelated topic"
          ],
          correctAnswer: "Fundamental principle"
        }
      ]
    });
  }
};
/* ================= FETCH ================= */
exports.getLatestRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ roadmap });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

exports.getAllRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ roadmaps });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

exports.getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    res.json({ roadmap });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};