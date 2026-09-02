import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, Lock, ArrowRight } from "lucide-react";

function Panier({
  panier,
  ajouterAuPanier,
  diminuerQuantite,
  supprimerArticle,
  nombreArticlesPanier,
}) {
  const totalPanier = panier.reduce(
    (total, article) => total + article.prix * article.quantite,
    0,
  );

  return (
    <main className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto w-full">
      {/* Titre */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-background">
            Votre Panier
          </h1>
          <Link
            to="/produits"
            className="bg-primary text-on-primary font-label-bold text-label-bold px-6 py-3 rounded-lg hover:scale-[1.02] transition-transform"
          >
            Voir les produits
          </Link>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2">
          {nombreArticlesPanier} article
          {nombreArticlesPanier > 1 ? "s" : ""} dans votre panier
        </p>
      </div>

      {/* Panier vide */}
      {panier.length === 0 ? (
        <div className="bg-surface rounded-xl shadow-sm border border-surface-variant p-12 text-center">
          <div className="text-6xl mb-5">🛒</div>
          <h2 className="font-title-md text-title-md text-on-background mb-2">
            🥲 Ça pique un peu de voir un panier aussi vide...
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Ajoutez quelques produits pour commencer vos achats.
          </p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Liste des produits */}
          <div className="grow space-y-4">
            {panier.map((article) => (
              <div
                key={article.id}
                className="flex flex-col sm:flex-row bg-surface rounded-lg shadow-sm border border-surface-variant p-4 gap-4 items-center"
              >
                {/* Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-surface-container rounded-md overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.nom}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Informations */}
                <div className="grow w-full flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-title-md text-title-md text-on-surface">
                      {article.nom}
                    </h3>
                    <span className="font-title-md text-title-md text-on-surface font-bold sm:hidden">
                      {article.prix.toLocaleString()} FCFA
                    </span>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4">
                    <span className="hidden sm:block font-title-md text-title-md text-on-surface font-bold">
                      {article.prix.toLocaleString()} FCFA
                    </span>

                    {/* Quantité */}
                    <div className="flex items-center border border-outline-variant rounded-md bg-surface">
                      <button
                        onClick={() => diminuerQuantite(article.id)}
                        className="px-3 py-1 text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="font-label-bold text-label-bold text-on-surface px-2 w-8 text-center">
                        {article.quantite}
                      </span>
                      <button
                        onClick={() => ajouterAuPanier(article)}
                        className="px-3 py-1 text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Sous-total + Supprimer */}
                    <div className="flex items-center gap-4">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Sous-total :{" "}
                        <span className="font-label-bold text-label-bold text-on-surface">
                          {(article.prix * article.quantite).toLocaleString()}{" "}
                          FCFA
                        </span>
                      </span>
                      <button
                        onClick={() => supprimerArticle(article.id)}
                        className="text-on-surface-variant hover:text-error transition-colors text-sm flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline font-label-sm text-label-sm">
                          Retirer
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Résumé de commande */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-surface-container-low rounded-xl border border-surface-variant p-6 sticky top-28 shadow-sm">
              <h2 className="font-title-md text-title-md text-on-surface mb-6 border-b border-surface-variant pb-2">
                Résumé de la commande
              </h2>

              <div className="space-y-4 font-body-md text-body-md text-on-surface-variant mb-6">
                <div className="flex justify-between">
                  <span>Articles</span>
                  <span className="text-on-surface">
                    {nombreArticlesPanier}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className="text-tertiary font-medium">Gratuite</span>
                </div>
              </div>

              <div className="flex justify-between font-title-md text-title-md text-on-surface font-bold mb-6 pt-4 border-t border-surface-variant">
                <span>Total</span>
                <span className="text-primary text-xl">
                  {totalPanier.toLocaleString()} FCFA
                </span>
              </div>

              <button className="w-full bg-primary text-on-primary font-label-bold text-label-bold py-4 rounded-lg hover:scale-[1.02] hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 mb-4">
                Commander
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Indicateur de confiance */}
              <div className="flex flex-col items-center gap-3 mt-6 pt-6 border-t border-surface-variant">
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <Lock className="h-3.5 w-3.5" />
                  <span className="font-label-sm text-label-sm">
                    Paiement 100% Sécurisé
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Panier;
