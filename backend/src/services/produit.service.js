const pool = require("../config/database");

async function obtenirTousLesProduits() {
  const resultat = await pool.query("SELECT * FROM produits");
  return resultat.rows;
}

async function obtenirProduitParId(id) {
  const resultat = await pool.query("SELECT * FROM produits WHERE id = $1", [
    id,
  ]);

  return resultat.rows[0];
}

async function creerProduit(donnees) {
  const { nom, prix, stock, categorie_id } = donnees;
  const resultat = await pool.query(
    "INSERT INTO produits (nom, prix, stock, categorie_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [nom, prix, stock, categorie_id],
  );
  return resultat.rows[0];
}

async function modifierProduit(id, donnees) {
  const { nom, prix, stock, categorie_id } = donnees;
  const resultat = await pool.query(
    "UPDATE produits SET nom = $1, prix = $2, stock = $3, categorie_id = $4 WHERE id = $5 RETURNING *",
    [nom, prix, stock, categorie_id, id],
  );
  return resultat.rows[0];
}

async function supprimerProduit(id) {
  const resultat = await pool.query(
    "DELETE FROM produits WHERE id = $1 RETURNING *",
    [id],
  );
  return resultat.rows[0];
}

module.exports = {
  obtenirTousLesProduits,
  obtenirProduitParId,
  creerProduit,
  modifierProduit,
  supprimerProduit,
};
