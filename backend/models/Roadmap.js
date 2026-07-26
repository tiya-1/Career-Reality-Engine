const mongoose = require("mongoose");

const evaluatedCareerSchema = new mongoose.Schema({
  name: String,
  domain: String,
  score: Number,
  category: { 
    type: String, 
    enum: ["FEASIBLE", "ALTERNATIVE", "EXPLORATION"],
    required: true 
  },
  difficulty: String,
  riskLevel: String,
  riskAnalysis: String,
  failurePatterns: String,
  aiMentorship: String
});

const roadmapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  inputSnapshot: Object,
  domains: [{ domain: String, careers: [evaluatedCareerSchema] }],
  activePlan: {
    selectedCareer: String,
    domain: String,
    durationInMonths: Number,
    startDate: { type: Date, default: Date.now },
    consistencyScore: { type: Number, default: 0 }, // Changed default to 0 for new plans
    milestones: [{ 
      week: Number, 
      task: String, 
      phase: String, 
      description: String, // <--- ADD THIS LINE
      isCompleted: { type: Boolean, default: false },
      completedAt: Date 
    }]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Roadmap", roadmapSchema);