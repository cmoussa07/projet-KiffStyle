const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./src/config/database");

pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Erreur PostgreSQL :", err);
    return;
  }

  console.log("Connexion PostgreSQL réussie :", result.rows[0]);
});

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue sur l'API KiffStyle 🚀",
  });
});

const produitRoutes = require("./src/routes/produit.routes");
const categorieRoutes = require("./src/routes/categorie.routes");
const utilisateurRoutes = require("./src/routes/utilisateur.routes");

app.use("/api/produits", produitRoutes);
app.use("/api/categories", categorieRoutes);
app.use("/api/utilisateurs", utilisateurRoutes);

app.listen(PORT, () => {
  console.log(`Serveur KiffStyle lancé sur http://localhost:${PORT}`);
});
