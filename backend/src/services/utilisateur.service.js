const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

module.exports = {
  creerUtilisateur,
  trouverUtilisateurParEmail,
};
