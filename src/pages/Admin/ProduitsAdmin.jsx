import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  obtenirProduits,
  supprimerProduit,
} from "../../services/produit.service";

function ProduitsAdmin() {
  const [produits, setProduits] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    async function chargerProduits() {
      try {
        const data = await obtenirProduits();
        setProduits(data);
      } catch (err) {
        console.error("Erreur :", err);
        setErreur("Impossible de récupérer les produits.");
      } finally {
        setChargement(false);
      }
    }

    chargerProduits();
  }, []);

  async function supprimer(id) {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer ce produit ?",
    );

    if (!confirmation) {
      return;
    }

    try {
      await supprimerProduit(id);

      setMessage("Produit supprimé avec succès !");
      setProduits(produits.filter((produit) => produit.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      setErreur("Impossible de supprimer le produit.");
    }
  }

  if (chargement) {
    return <p className="p-8">Chargement...</p>;
  }

  if (erreur) {
    return <p className="p-8 text-red-600">{erreur}</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gestion des produits
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {produits.length} produit{produits.length > 1 ? "s" : ""} au
              catalogue
            </p>
          </div>
        </div>

        {message && (
          <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-100 text-green-700 text-sm">
            <span className="text-green-500">✅</span>
            {message}
          </div>
        )}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                ID
              </th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Nom
              </th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Prix
              </th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Stock
              </th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Catégorie
              </th>
              <th className="p-4 text-left">Actions</th>
              {/* <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Actions
              </th> */}
            </tr>
          </thead>

          <tbody>
            {produits.map((produit) => (
              <tr
                key={produit.id}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
              >
                <td className="p-4 text-sm text-gray-400">#{produit.id}</td>
                <td className="p-4 font-medium text-gray-900">{produit.nom}</td>
                <td className="p-4 font-semibold text-gray-900">
                  {produit.prix.toLocaleString()}{" "}
                  <span className="text-xs text-gray-400">FCFA</span>
                </td>
                <td className="p-4">
                  {produit.stock > 0 ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {produit.stock} en stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      Rupture
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                    {produit.categorie}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/admin/produits/${produit.id}/modifier`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      ✏️ Modifier
                    </Link>

                    <button
                      onClick={() => supprimer(produit.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {produits.length === 0 && (
          <div className="p-12 text-center text-gray-400 text-sm">
            Aucun produit pour le moment.
          </div>
        )}
      </div>
    </div>
  );
}

export default ProduitsAdmin;
