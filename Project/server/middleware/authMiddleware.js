const jwt = require("jsonwebtoken");

// Verifies the JWT sent in the Authorization header.
// Usage: router.get("/protected-route", protect, someController);
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Expect header format: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded payload so later handlers know who's calling
    req.user = decoded; // { id, role, iat, exp }
    next();
  } catch (error) {
    // Covers expired tokens, tampered tokens, wrong secret, malformed tokens
    return res.status(401).json({ message: "Not authorized, invalid or expired token." });
  }
};

// restrict by role in the future, e.g. protect("Admin")
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "You do not have permission to perform this action." });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };