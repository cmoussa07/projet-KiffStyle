import { Link } from "react-router-dom";
import { ShoppingCart, Eye, Minus, Plus } from "lucide-react";

function ProductCard({ produit, panier, ajouterAuPanier, diminuerQuantite }) {
  if (!produit) return null;

  const { nom, prix, image, stock } = produit;
  const disponible = stock > 0;

  const articlePanier = panier.find((item) => item.id === produit.id);
  const quantiteDansPanier = articlePanier ? articlePanier.quantite : 0;

  return (
    <article className="bg-surface border border-surface-variant rounded-lg overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
      <div className="relative aspect-square p-4 bg-white flex items-center justify-center">
        {disponible ? (
          <div className="absolute top-4 left-4 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-2 py-1 rounded-full flex items-center gap-1 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>{" "}
            Disponible
          </div>
        ) : (
          <div className="absolute top-4 left-4 bg-error-container text-on-error-container font-label-sm text-label-sm px-2 py-1 rounded-full flex items-center gap-1 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Rupture
          </div>
        )}

        <Link
          to={`/produits/${produit.id}`}
          className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white z-10"
        >
          <Eye className="h-4 w-4 text-on-background" />
        </Link>

        <img
          className={`w-full h-auto object-contain transition-transform duration-300 ${
            disponible
              ? "group-hover:-translate-y-2"
              : "opacity-60 grayscale-[50%]"
          }`}
          alt={nom}
          src={image}
        />
      </div>

      <div className="p-4 flex flex-col flex-grow border-t border-surface-variant">
        <h3 className="font-title-md text-title-md text-on-background mb-2 line-clamp-1">
          {nom}
        </h3>

        <div className="flex items-baseline justify-between mb-2">
          <span
            className={`font-label-bold text-label-bold ${
              disponible ? "text-on-background" : "text-on-surface-variant"
            }`}
          >
            {prix.toLocaleString()} FCFA
          </span>
          <span className="font-label-sm text-label-sm text-outline">
            Livraison offerte
          </span>
        </div>

        {quantiteDansPanier === 0 ? (
          <button
            disabled={!disponible}
            onClick={() => ajouterAuPanier(produit)}
            className="mt-auto flex items-center justify-center gap-2 bg-primary text-on-primary font-label-bold text-label-bold py-2.5 rounded-full transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:bg-surface-variant disabled:text-outline disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-4 w-4" />
            {disponible ? "Ajouter au panier" : "Indisponible"}
          </button>
        ) : (
          <div className="mt-auto flex items-center justify-between bg-surface-container rounded-full p-2">
            <button
              onClick={() => diminuerQuantite(produit.id)}
              className="w-9 h-9 rounded-full bg-surface shadow hover:bg-surface-variant transition flex items-center justify-center text-on-background"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="font-label-bold text-label-bold text-on-background">
              {quantiteDansPanier}
            </span>

            <button
              onClick={() => ajouterAuPanier(produit)}
              disabled={quantiteDansPanier >= stock}
              className="w-9 h-9 rounded-full bg-primary text-on-primary shadow hover:scale-105 disabled:bg-surface-variant disabled:text-outline disabled:cursor-not-allowed transition flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
