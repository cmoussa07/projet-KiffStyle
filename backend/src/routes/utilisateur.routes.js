const express = require("express");

const router = express.Router();

const {
  inscrireUtilisateur,
  connecterUtilisateur,
  obtenirProfil,
  modifierProfil,
  modifierMotDePasse,
  supprimerMonCompte,
} = require("../controllers/utilisateur.controller");

const { verifierToken } = require("../middlewares/auth.middleware");

router.post("/inscription", inscrireUtilisateur);
router.post("/connexion", connecterUtilisateur);

router.get("/profil", verifierToken, obtenirProfil);
router.put("/profil", verifierToken, modifierProfil);
router.put("/mot-de-passe", verifierToken, modifierMotDePasse);
router.delete("/profil", verifierToken, supprimerMonCompte);

module.exports = router;
