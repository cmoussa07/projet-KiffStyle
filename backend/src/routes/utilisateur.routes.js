const express = require("express");

const router = express.Router();

const {
  inscrireUtilisateur,
  connecterUtilisateur,
  obtenirProfil,
} = require("../controllers/utilisateur.controller");

const { verifierToken } = require("../middlewares/auth.middleware");

router.post("/inscription", inscrireUtilisateur);
router.post("/connexion", connecterUtilisateur);

router.get("/profil", verifierToken, obtenirProfil);

module.exports = router;
