const express = require("express");

const router = express.Router();

const {
  inscrireUtilisateur,
  connecterUtilisateur,
  obtenirProfil,
  modifierProfil,
} = require("../controllers/utilisateur.controller");

const { verifierToken } = require("../middlewares/auth.middleware");

router.post("/inscription", inscrireUtilisateur);
router.post("/connexion", connecterUtilisateur);

router.get("/profil", verifierToken, obtenirProfil);
router.put("/profil", verifierToken, modifierProfil);

module.exports = router;
