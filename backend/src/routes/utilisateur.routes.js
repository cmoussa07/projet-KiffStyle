const express = require("express");

const router = express.Router();

const {
  inscrireUtilisateur,
  connecterUtilisateur,
} = require("../controllers/utilisateur.controller");

const {
  verifierToken,
  verifierAdmin,
} = require("../middlewares/auth.middleware");

router.post("/inscription", inscrireUtilisateur);
router.post("/connexion", connecterUtilisateur);

router.get("/profil", verifierToken, verifierAdmin, (req, res) => {
  res.json({
    message: "Accès autorisé",
    utilisateur: req.utilisateur,
  });
});

module.exports = router;
