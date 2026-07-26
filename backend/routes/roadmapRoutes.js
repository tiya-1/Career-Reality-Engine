const express = require("express");
const router = express.Router();
const {
  generateRoadmap,
  getLatestRoadmap,
  getAllRoadmaps,
  getRoadmapById,
  startPlan,
  updateProgress,
  generateTest
} = require("../controllers/roadmapController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/generate", generateRoadmap);
router.post("/start-plan", startPlan);
router.patch("/update-progress", updateProgress); // Added progress tracking
router.get("/my", getAllRoadmaps);
router.get("/latest", getLatestRoadmap);
router.get("/:id", getRoadmapById);
router.post("/test/generate", generateTest); 
module.exports = router;