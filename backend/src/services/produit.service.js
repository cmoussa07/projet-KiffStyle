const produits = [
  {
    id: 1,
    nom: "Nike Air Max",
    prix: 45000,
    stock: 8,
  },
  {
    id: 2,
    nom: "Puma RS-X",
    prix: 35000,
    stock: 0,
  },
  {
    id: 3,
    nom: "Casio Vintage",
    prix: 30000,
    stock: 5,
  },
  {
    id: 4,
    nom: "Adidas Superstar",
    prix: 50000,
    stock: 10,
  },
];

function obtenirTousLesProduits() {
  return produits;
}

function obtenirProduitParId(id) {
  return produits.find((produit) => produit.id === id);
}

function creerProduit(donneesProduit) {
  const nouveauProduit = {
    id: produits.length + 1,
    ...donneesProduit,
  };

  produits.push(nouveauProduit);

  return nouveauProduit;
}

function modifierProduit(id, donneesProduit) {
  const index = produits.findIndex((produit) => produit.id === id);

  if (index === -1) {
    return null;
  }

  produits[index] = {
    ...produits[index],
    ...donneesProduit,
    id: id,
  };

  return produits[index];
}

module.exports = {
  obtenirTousLesProduits,
  obtenirProduitParId,
  creerProduit,
  modifierProduit,
};
