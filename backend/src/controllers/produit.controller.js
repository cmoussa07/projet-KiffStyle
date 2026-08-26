const {
  obtenirTousLesProduits,
  obtenirProduitParId,
  creerProduit,
  modifierProduit,
  supprimerProduit,
} = require("../services/produit.service");

async function obtenirProduits(req, res) {
  try {
    const produits = await obtenirTousLesProduits();

    res.status(200).json(produits);
  } catch (err) {
    console.error("Erreur PostgreSQL :", err);

    res.status(500).json({
      message: "Erreur lors de la récupération des produits",
    });
  }
}

async function obtenirProduit(req, res) {
  try {
    const id = Number(req.params.id);
    const produit = await obtenirProduitParId(id);

    if (!produit) {
      return res.status(404).json({
        message: "Produit non trouvé",
      });
    }

    res.status(200).json(produit);
  } catch (err) {
    console.error("Erreur PostgreSQL :", err);

    res.status(500).json({
      message: "Erreur lors de la récupération du produit",
    });
  }
}

async function ajouterProduit(req, res) {
  try {
    const { nom, prix, stock, categorie_id } = req.body;

    if (
      !req.body ||
      !nom ||
      prix === undefined ||
      stock === undefined ||
      categorie_id === undefined
    ) {
      return res.status(400).json({
        message: "Données du produit incomplètes",
      });
    }

    const produit = await creerProduit(req.body);

    res.status(201).json(produit);
  } catch (err) {
    console.error("Erreur PostgreSQL :", err);

    res.status(500).json({
      message: "Erreur lors de la création du produit",
    });
  }
}

async function mettreAJourProduit(req, res) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Id invalide" });
    }

    const { nom, prix, stock, categorie_id } = req.body;

    if (
      !req.body ||
      !nom ||
      prix === undefined ||
      stock === undefined ||
      categorie_id === undefined
    ) {
      return res.status(400).json({
        message: "Données du produit incomplètes",
      });
    }

    const produit = await modifierProduit(id, req.body);

    if (!produit) {
      return res.status(404).json({
        message: "Produit non trouvé",
      });
    }

    res.status(200).json(produit);
  } catch (err) {
    console.error("Erreur PostgreSQL :", err);

    res.status(500).json({
      message: "Erreur lors de la mise à jour du produit",
    });
  }
}

async function retirerProduit(req, res) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Id invalide" });
    }

    const produit = await supprimerProduit(id);

    if (!produit) {
      return res.status(404).json({
        message: "Produit non trouvé",
      });
    }

    res.status(204).json(produit);
  } catch (err) {
    console.error("Erreur PostgreSQL :", err);

    res.status(500).json({
      message: "Erreur lors de la suppression du produit",
    });
  }
}

module.exports = {
  obtenirProduits,
  obtenirProduit,
  ajouterProduit,
  mettreAJourProduit,
  retirerProduit,
};
