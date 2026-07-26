const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Support both id and userId
    const extractedId = decoded.userId || decoded.id;

    if (!extractedId) {
      return res.status(401).json({ msg: "Invalid token payload" });
    }

    req.user = { id: extractedId };
    next();
} catch (err) {
    if (err.name === "TokenExpiredError") {
      // Send a specific code or flag for the frontend to handle
      return res.status(401).json({ 
        msg: "Session expired", 
        expired: true // Frontend checks for this flag
      });
    }
    res.status(401).json({ msg: "Token is not valid" });
} };
