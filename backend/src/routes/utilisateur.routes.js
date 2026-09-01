const express = require("express");

const router = express.Router();

const {
  ajouterUtilisateur,
  connecterUtilisateur,
} = require("../controllers/utilisateur.controller");

router.post("/inscription", ajouterUtilisateur);
router.post("/connexion", connecterUtilisateur);

module.exports = router;
