const { obtenirToutesLesCategories } = require("../services/categorie.service");

async function obtenirCategories(req, res) {
  try {
    const categories = await obtenirToutesLesCategories();

    res.status(200).json(categories);
  } catch (err) {
    console.error("Erreur PostgreSQL :", err);

    res.status(500).json({
      message: "Erreur lors de la récupération des catégories",
    });
  }
}

module.exports = {
  obtenirCategories,
};
