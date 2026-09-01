const jwt = require("jsonwebtoken");

function verifierToken(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        message: "Token manquant",
      });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token manquant",
      });
    }

    const utilisateur = jwt.verify(token, process.env.JWT_SECRET);

    req.utilisateur = utilisateur;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Token invalide ou expiré",
    });
  }
}

function verifierAdmin(req, res, next) {
  if (req.utilisateur.role !== "admin") {
    return res.status(403).json({
      message: "Accès réservé aux administrateurs",
    });
  }

  next();
}

module.exports = {
  verifierToken,
  verifierAdmin,
};
