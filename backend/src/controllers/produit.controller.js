const {
  obtenirTousLesProduits,
  obtenirProduitParId,
  creerProduit,
  modifierProduit,
} = require("../services/produit.service");

function obtenirProduits(req, res) {
  const produits = obtenirTousLesProduits();

  res.json(produits);
}

function obtenirProduit(req, res) {
  const id = Number(req.params.id);

  const produit = obtenirProduitParId(id);

  if (!produit) {
    return res.status(404).json({
      message: "Produit introuvable",
    });
  }

  res.json(produit);
}

function ajouterProduit(req, res) {
  const nouveauProduit = creerProduit(req.body);

  res.status(201).json(nouveauProduit);
}

function mettreAJourProduit(req, res) {
  const id = Number(req.params.id);

  const produitModifie = modifierProduit(id, req.body);

  if (!produitModifie) {
    return res.status(404).json({
      message: "Produit introuvable",
    });
  }

  res.status(200).json(produitModifie);
}

module.exports = {
  obtenirProduits,
  obtenirProduit,
  ajouterProduit,
  mettreAJourProduit,
};
