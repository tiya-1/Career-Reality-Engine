const express = require("express");
const router = express.Router();

const { generateTestAI } = require("../utils/testEngine");
const { getContext } = require("../utils/ragService");

router.post("/generate", async (req, res) => {
  try {
    const { domain, career } = req.body;

    // 1. RAG context
    const context = await getContext(career);

    // 2. Generate AI test
    const test = await generateTestAI({ domain, career }, context);

    res.json(test);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Test generation failed" });
  }
});

module.exports = router;