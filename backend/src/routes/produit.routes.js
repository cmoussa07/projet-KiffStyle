const express = require("express");

const router = express.Router();

const {
  obtenirProduits,
  obtenirProduit,
  ajouterProduit,
  mettreAJourProduit,
} = require("../controllers/produit.controller");

router.get("/", obtenirProduits);
router.get("/:id", obtenirProduit);
router.post("/", ajouterProduit);
router.put("/:id", mettreAJourProduit);
// router.delete("/:id", retirerProduit);

module.exports = router;
