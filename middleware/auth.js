// middleware/auth.js
import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  // Check for the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Extract token from header
  const token = authHeader.split(" ")[1]; // Format: "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Token is valid, store the decoded payload in req.user for further use
    req.user = decodedPayload;
    next();
  });
}

module.exports = authMiddleware;
