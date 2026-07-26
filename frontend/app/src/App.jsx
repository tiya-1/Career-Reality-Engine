import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Features from "./pages/Features";
import Overview from "./pages/Overview";
import Blog from "./pages/BlogPage";
import Pricing from "./pages/PricingPage";

import RoadmapForm from "./pages/RoadmapForm";
import RoadmapResult from "./pages/RoadmapResult";
import RoadmapDashboard from "./pages/RoadmapDashboard";
import ProgressPage from "./pages/ProgressPage";
import TestPage from "./pages/TestPage";   // ✅ NEW

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";
import "./styles/global.css";

function App() {
  return (
    <>
      <div className="background-gradient"></div>

      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/features" element={<Features />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* ================= PROTECTED ROUTES ================= */}

          <Route
            path="/roadmap-form"
            element={
              <ProtectedRoute>
                <RoadmapForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/roadmap-result"
            element={
              <ProtectedRoute>
                <RoadmapResult />
              </ProtectedRoute>
            }
          />

          <Route
            path="/roadmap-result/:id"
            element={
              <ProtectedRoute>
                <RoadmapResult />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <RoadmapDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                <ProgressPage />
              </ProtectedRoute>
            }
          />

          {/* ✅ NEW: TEST PAGE */}
          <Route
            path="/test"
            element={
              <ProtectedRoute>
                <TestPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;