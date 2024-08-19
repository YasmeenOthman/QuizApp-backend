
const jwt = require("jsonwebtoken")


const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded; // The decoded payload will be available in req.user

      next();
    } catch (error) {
      return res.status(403).json({ error: "Failed to authenticate token." });
    }
  } else {
    res.status(401).json({ error: "No token provided." });
  }
};

module.exports = authenticate; 