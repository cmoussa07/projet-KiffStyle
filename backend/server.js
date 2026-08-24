const express = require("express");
const cors = require("cors");

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

app.use("/api/produits", produitRoutes);

app.listen(PORT, () => {
  console.log(`Serveur KiffStyle lancé sur http://localhost:${PORT}`);
});
