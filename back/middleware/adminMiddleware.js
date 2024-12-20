const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Récupérer le token du header

  if (!token || req.user.role !== "admin") {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajoute les infos utilisateur décodées à req
    next();
  } catch (err) {
    res.status(401).send({ error: "Invalid token." });
  }
};

module.exports = adminMiddleware;
