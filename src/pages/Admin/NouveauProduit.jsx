import { useEffect, useState } from "react";

import { creerProduit } from "../../services/produit.service";
import { obtenirCategories } from "../../services/categorie.service";

function NouveauProduit() {
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [stock, setStock] = useState("");
  const [categorieId, setCategorieId] = useState("");

  const [chargement, setChargement] = useState(false);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [chargementCategories, setChargementCategories] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    async function chargerCategories() {
      try {
        const data = await obtenirCategories();

        setCategories(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des catégories :", err);

        setErreur("Impossible de récupérer les catégories.");
      } finally {
        setChargementCategories(false);
      }
    }

    chargerCategories();
  }, []);

  async function ajouterProduit(e) {
    e.preventDefault();

    setChargement(true);
    setMessage("");
    setErreur("");

    const produit = {
      nom,
      prix: Number(prix),
      stock: Number(stock),
      categorie_id: Number(categorieId),
    };

    try {
      const nouveauProduit = await creerProduit(produit);

      console.log("Produit créé :", nouveauProduit);

      setMessage("Produit ajouté avec succès !");

      setNom("");
      setPrix("");
      setStock("");
      setCategorieId("");
    } catch (err) {
      console.error("Erreur lors de la création du produit :", err);

      setErreur("Impossible de créer le produit.");
    } finally {
      setChargement(false);
    }
  }

  return (
    <div className="container mx-auto p-8 max-w-xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">
        Ajouter un produit
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Renseigne les informations du nouveau produit.
      </p>

      {message && (
        <p className="mb-4 p-3 rounded-lg bg-green-100 text-green-700">
          ✅ {message}
        </p>
      )}

      {erreur && (
        <p className="mb-4 p-3 rounded-lg bg-red-100 text-red-700">
          ❌ {erreur}
        </p>
      )}

      <form onSubmit={ajouterProduit} className="space-y-5">
        <div>
          <label
            htmlFor="nom"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Nom du produit
          </label>

          <input
            id="nom"
            type="text"
            placeholder="Ex : Nike Air Max"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="prix"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Prix (FCFA)
            </label>

            <input
              id="prix"
              type="number"
              min="0"
              placeholder="45000"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Stock
            </label>

            <input
              id="stock"
              type="number"
              min="0"
              placeholder="10"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="categorieId"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Catégorie
          </label>

          <select
            id="categorieId"
            value={categorieId}
            onChange={(e) => setCategorieId(e.target.value)}
            disabled={chargementCategories || !!erreur}
            className="border border-gray-300 p-3 w-full rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option value="">
              {chargementCategories
                ? "Chargement des catégories..."
                : "Sélectionner une catégorie"}
            </option>

            {categories.map((categorie) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.nom}
              </option>
            ))}
          </select>

          {erreur && <p className="text-sm text-red-600 mt-2">{erreur}</p>}
        </div>

        <button
          type="submit"
          disabled={chargement}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium px-5 py-3 rounded-lg w-full transition"
        >
          {chargement ? "⏳ Ajout en cours..." : "➕ Ajouter le produit"}
        </button>
      </form>
    </div>
  );
}

export default NouveauProduit;
