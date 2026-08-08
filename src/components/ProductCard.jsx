import { Link } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";

function ProductCard({ produit, panier, ajouterAuPanier, diminuerQuantite }) {
  if (!produit) return null;

  const { nom, prix, image, stock } = produit;
  const disponible = stock > 0;

  const articlePanier = panier.find((item) => item.id === produit.id);
  const quantiteDansPanier = articlePanier ? articlePanier.quantite : 0;

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col h-full">
      {/* Image avec zoom au survol */}
      <div className="relative overflow-hidden aspect-square bg-gray-50">
        <img
          src={image}
          alt={nom}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badge de stock repositionné sur l'image */}
        <div className="absolute top-3 left-3">
          {disponible ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
              🟢 Disponible
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
              🔴 Rupture
            </span>
          )}
        </div>

        {/* Icône "voir détails" qui apparaît au survol */}
        <Link
          to={`/produits/${produit.id}`}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
        >
          <Eye className="h-4 w-4 text-gray-700" />
        </Link>
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Nom du produit */}
        <h3 className="text-lg font-semibold text-gray-900 mb-1 tracking-wide line-clamp-1">
          {nom}
        </h3>

        {/* Prix + livraison sur la même ligne */}
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-xl font-bold text-blue-600">
            {prix.toLocaleString()} FCFA
          </p>
          <p className="text-xs text-gray-400">Livraison offerte</p>
        </div>

        {/* Bouton, poussé en bas grâce à mt-auto */}
        {quantiteDansPanier === 0 ? (
          <button
            disabled={!disponible}
            onClick={() => ajouterAuPanier(produit)}
            className="mt-auto cursor-pointer flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <ShoppingCart className="h-4 w-4" />
            {disponible ? "Ajouter au panier" : "Indisponible"}
          </button>
        ) : (
          <div className="mt-auto flex items-center justify-between bg-gray-100 rounded-xl p-2">
            <button
              onClick={() => diminuerQuantite(produit.id)}
              className="w-10 h-10 rounded-lg bg-white shadow hover:bg-gray-50 transition"
            >
              −
            </button>

            <span className="text-lg font-bold">{quantiteDansPanier}</span>

            <button
              onClick={() => ajouterAuPanier(produit)}
              disabled={quantiteDansPanier >= stock}
              className="w-10 h-10 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
