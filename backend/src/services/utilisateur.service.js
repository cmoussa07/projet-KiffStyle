const pool = require("../config/database");
const bcrypt = require("bcrypt");

async function creerUtilisateur(donnees) {
  const { nom, email, mot_de_passe, role = "client" } = donnees;

  const motDePasseHash = await bcrypt.hash(mot_de_passe, 12);

  const resultat = await pool.query(
    "INSERT INTO utilisateurs (nom, email, mot_de_passe, role) VALUES ($1, $2, $3, $4) RETURNING id, nom, email, role",
    [nom, email, motDePasseHash, role],
  );

  return resultat.rows[0];
}

async function trouverUtilisateurParEmail(email) {
  const resultat = await pool.query(
    "SELECT * FROM utilisateurs WHERE email = $1",
    [email],
  );

  return resultat.rows[0];
}

async function trouverUtilisateurParId(id) {
  const resultat = await pool.query(
    "SELECT id, nom, email, role, created_at FROM utilisateurs WHERE id = $1",
    [id],
  );

  return resultat.rows[0];
}

async function modifierUtilisateur(id, donnees) {
  const { nom, email } = donnees;

  const resultat = await pool.query(
    "UPDATE utilisateurs SET nom = $1, email = $2 WHERE id = $3 RETURNING id, nom, email, role",
    [nom, email, id],
  );

  return resultat.rows[0];
}

module.exports = {
  creerUtilisateur,
  trouverUtilisateurParEmail,
  trouverUtilisateurParId,
  modifierUtilisateur,
};
