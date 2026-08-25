const {
  obtenirTousLesProduits,
  obtenirProduitParId,
  creerProduit,
  modifierProduit,
  supprimerProduit,
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

function retirerProduit(req, res) {
  const id = Number(req.params.id);

  const produitSupprime = supprimerProduit(id);

  if (!produitSupprime) {
    return res.status(404).json({
      message: "Produit introuvable",
    });
  }

  res.status(204).json({
    message: "Produit supprimé avec succès",
    produit: produitSupprime,
  });
}

module.exports = {
  obtenirProduits,
  obtenirProduit,
  ajouterProduit,
  mettreAJourProduit,
  retirerProduit,
};
