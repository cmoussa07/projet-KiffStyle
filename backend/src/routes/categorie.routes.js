const express = require("express");

const router = express.Router();

const { obtenirCategories } = require("../controllers/categorie.controller");

router.get("/", obtenirCategories);

module.exports = router;
