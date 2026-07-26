require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const { initRAG } = require("./utils/ragService");
const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/test", testRoutes);
/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ================= START SERVER (FIXED) ================= */
const startServer = async () => {
  try {
    // ✅ DB first
    await connectDB();
    console.log("✅ MongoDB Connected");

    // ✅ RAG second
    // await initRAG();
    // console.log("✅ RAG Initialized");

    // ✅ Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Server startup error:", err);
    process.exit(1);
  }
};

startServer();