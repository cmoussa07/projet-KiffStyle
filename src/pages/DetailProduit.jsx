import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingCart, ArrowLeft, Truck, ShieldCheck } from "lucide-react";

import { obtenirProduitParId } from "../services/produit.service.js";

function DetailProduit({ panier, ajouterAuPanier, diminuerQuantite }) {
  const { id } = useParams();

  const [produit, setProduit] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    async function chargerProduit() {
      try {
        const data = await obtenirProduitParId(id);

        setProduit(data);
      } catch (err) {
        console.error("Erreur lors de la récupération du produit :", err);
        setErreur("Impossible de récupérer le produit.");
      } finally {
        setChargement(false);
      }
    }

    chargerProduit();
  }, [id]);

  if (chargement) {
    return (
      <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="text-6xl mb-4 animate-pulse">⏳</div>
        <p className="text-gray-500">Chargement du produit...</p>
      </div>
    );
  }

  if (erreur) {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="text-6xl mb-4">😵</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Oups, une erreur est survenue
        </h1>
        <p className="text-gray-500 mb-6">{erreur}</p>
        <Link
          to="/produits"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux produits
        </Link>
      </div>
    );
  }

  if (!produit) {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="text-6xl mb-4">🧐</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Produit introuvable
        </h1>
        <p className="text-gray-500 mb-6">
          Ce produit n'existe pas ou a été retiré du catalogue.
        </p>
        <Link
          to="/produits"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux produits
        </Link>
      </div>
    );
  }

  const { nom, prix, image, stock } = produit;
  const disponible = stock > 0;

  const articlePanier = panier.find((item) => item.id === produit.id);
  const quantiteDansPanier = articlePanier ? articlePanier.quantite : 0;

  return (
    <div className="container mx-auto p-8 max-w-5xl">
      <Link
        to="/produits"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux produits
      </Link>

      <div className="grid md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="bg-gray-50 flex items-center justify-center p-8">
          <img
            src={image}
            alt={nom}
            className="w-full max-w-sm object-contain rounded-2xl"
          />
        </div>

        <div className="p-8 flex flex-col">
          <div className="mb-4">
            {disponible ? (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                🟢 En stock ({stock} disponibles)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700 bg-red-100 px-3 py-1 rounded-full">
                🔴 Rupture de stock
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-wide">
            {nom}
          </h1>

          <p className="text-3xl font-bold text-blue-600 mb-6">
            {prix.toLocaleString()} FCFA
          </p>

          <p className="text-gray-500 mb-6 leading-relaxed">
            Découvrez {nom}, un incontournable de la collection KiffStyle.
            Qualité, style et confort réunis pour accompagner votre quotidien.
          </p>

          <div className="flex flex-col gap-3 mb-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-blue-600" />
              Livraison offerte partout à Abidjan
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              Paiement sécurisé
            </div>
          </div>

          <div className="mt-auto">
            {quantiteDansPanier === 0 ? (
              <button
                disabled={!disponible}
                onClick={() => ajouterAuPanier(produit)}
                className="cursor-pointer w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-xl transition-transform duration-200 hover:scale-[1.02]"
              >
                <ShoppingCart className="h-5 w-5" />
                Ajouter au panier
              </button>
            ) : (
              <div className="flex items-center justify-between bg-gray-100 rounded-xl p-2">
                <button
                  onClick={() => diminuerQuantite(produit.id)}
                  className="w-12 h-12 rounded-lg bg-white shadow text-lg"
                >
                  −
                </button>

                <span className="text-xl font-bold">{quantiteDansPanier}</span>

                <button
                  onClick={() => ajouterAuPanier(produit)}
                  className="w-12 h-12 rounded-lg bg-blue-600 text-white shadow text-lg"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduit;
