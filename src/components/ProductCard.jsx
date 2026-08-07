import { ShoppingCart } from "lucide-react";

function ProductCard({ produit, panier, ajouterAuPanier, diminuerQuantite }) {
  if (!produit) return null;

  const { nom, prix, image, stock } = produit;
  const disponible = stock > 0;

  const articlePanier = panier.find((item) => item.id === produit.id);
  const quantiteDansPanier = articlePanier ? articlePanier.quantite : 0;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col h-full">
      {/* Image avec zoom au survol */}
      <div className="overflow-hidden aspect-square">
        <img
          src={image}
          alt={nom}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Badge de stock */}
        <div className="mb-3">
          {disponible ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
              🟢 Disponible
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700 bg-red-100 px-3 py-1 rounded-full">
              🔴 Rupture
            </span>
          )}
        </div>

        {/* Nom du produit */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-wide">
          {nom}
        </h3>

        {/* Prix */}
        <p className="text-xl font-bold text-blue-600">
          {prix.toLocaleString()} FCFA
        </p>

        {/* Info livraison */}
        <p className="text-sm text-gray-400 mt-1 mb-4">Livraison offerte</p>

        {/* Bouton, poussé en bas grâce à mt-auto */}

        {quantiteDansPanier === 0 ? (
          <button
            disabled={!disponible}
            onClick={() => ajouterAuPanier(produit)}
            className=" cursor-pointer mt-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-xl transition-transform duration-200 hover:scale-105"
          >
            <ShoppingCart className="h-4 w-4" />
            Ajouter au panier
          </button>
        ) : (
          <div className="mt-auto flex items-center justify-between bg-gray-100 rounded-xl p-2">
            <button
              onClick={() => diminuerQuantite(produit.id)}
              className="w-10 h-10 rounded-lg bg-white shadow"
            >
              −
            </button>

            <span className="text-lg font-bold">{quantiteDansPanier}</span>

            <button
              onClick={() => ajouterAuPanier(produit)}
              className="w-10 h-10 rounded-lg bg-blue-600 text-white shadow"
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
