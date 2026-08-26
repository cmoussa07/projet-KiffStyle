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

module.exports = {
  obtenirTousLesProduits,
  obtenirProduitParId,
  creerProduit,
};
