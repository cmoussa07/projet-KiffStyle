import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  obtenirProduitParId,
  modifierProduit,
} from "../../services/produit.service";
import { obtenirCategories } from "../../services/categorie.service";

function ModifierProduit() {
  const { id } = useParams();

  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [stock, setStock] = useState("");
  const [categorieId, setCategorieId] = useState("");

  const [categories, setCategories] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [envoi, setEnvoi] = useState(false);
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    async function chargerDonnees() {
      try {
        const [produit, categories] = await Promise.all([
          obtenirProduitParId(id),
          obtenirCategories(),
        ]);

        setNom(produit.nom);
        setPrix(produit.prix);
        setStock(produit.stock);
        setCategorieId(produit.categorie_id);

        setCategories(categories);
      } catch (err) {
        console.error("Erreur :", err);
        setErreur("Impossible de récupérer les données.");
      } finally {
        setChargement(false);
      }
    }

    chargerDonnees();
  }, [id]);

  async function enregistrerModification(e) {
    e.preventDefault();

    setEnvoi(true);
    setMessage("");
    setErreur("");

    const produit = {
      nom,
      prix: Number(prix),
      stock: Number(stock),
      categorie_id: Number(categorieId),
    };

    try {
      const produitModifie = await modifierProduit(id, produit);

      console.log("Produit modifié :", produitModifie);

      setMessage("Produit modifié avec succès !");
    } catch (err) {
      console.error("Erreur lors de la modification :", err);
      setErreur("Impossible de modifier le produit.");
    } finally {
      setEnvoi(false);
    }
  }

  if (chargement) {
    return <p className="p-8">Chargement...</p>;
  }

  if (erreur && !nom) {
    return <p className="p-8 text-red-600">{erreur}</p>;
  }

  return (
    <div className="container mx-auto p-8 max-w-xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">
        Modifier le produit
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Modifie les informations du produit.
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

      <form onSubmit={enregistrerModification} className="space-y-5">
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
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg"
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
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-lg"
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
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-lg"
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
            className="border border-gray-300 p-3 w-full rounded-lg bg-white"
          >
            {categories.map((categorie) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.nom}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={envoi}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium px-5 py-3 rounded-lg w-full"
        >
          {envoi ? "⏳ Modification..." : "✏️ Enregistrer les modifications"}
        </button>
      </form>
    </div>
  );
}

export default ModifierProduit;
