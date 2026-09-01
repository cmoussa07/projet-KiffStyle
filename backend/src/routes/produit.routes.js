const express = require("express");

const router = express.Router();

const {
  obtenirProduits,
  obtenirProduit,
  ajouterProduit,
  mettreAJourProduit,
  retirerProduit,
} = require("../controllers/produit.controller");

const {
  verifierToken,
  verifierAdmin,
} = require("../middlewares/auth.middleware");

router.get("/", obtenirProduits);
router.get("/:id", obtenirProduit);
router.post("/", verifierToken, verifierAdmin, ajouterProduit);
router.put("/:id", verifierToken, verifierAdmin, mettreAJourProduit);
router.delete("/:id", verifierToken, verifierAdmin, retirerProduit);

module.exports = router;
