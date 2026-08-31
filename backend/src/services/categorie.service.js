const pool = require("../config/database");

async function obtenirToutesLesCategories() {
  const resultat = await pool.query(
    "SELECT id, nom FROM categories ORDER BY nom ASC",
  );

  return resultat.rows;
}

module.exports = {
  obtenirToutesLesCategories,
};
