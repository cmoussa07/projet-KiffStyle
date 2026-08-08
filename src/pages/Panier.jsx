import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <div className=" mb-10">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl text-gray-900">Mon Panier</h1>
            <Link
              to="/produits"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition"
            >
              Voir les produits
            </Link>
          </div>
          <p className="text-gray-500 mt-2">
            {nombreArticlesPanier} article
            {nombreArticlesPanier > 1 ? "s" : ""} dans votre panier
          </p>
        </div>

        {/* Panier vide */}
        {panier.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="text-6xl mb-5">🛒</div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              🥲 Ça pique un peu de voir un panier aussi vide...
            </h2>

            <p className="text-gray-500">
              Ajoutez quelques produits pour commencer vos achats.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des produits */}
            <div className="lg:col-span-2 space-y-5">
              {panier.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row gap-5"
                >
                  {/* Image */}
                  <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={article.image}
                      alt={article.nom}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Informations */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {article.nom}
                        </h2>

                        <p className="text-blue-600 font-bold mt-1">
                          {article.prix.toLocaleString()} FCFA
                        </p>
                      </div>

                      {/* Supprimer */}
                      <button
                        onClick={() => supprimerArticle(article.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition"
                      >
                        Supprimer
                      </button>
                    </div>

                    {/* Bas de la carte */}
                    <div className="mt-auto pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Quantité */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">Quantité</span>

                        <div className="flex items-center bg-gray-100 rounded-xl p-1">
                          <button
                            onClick={() => diminuerQuantite(article.id)}
                            className="w-9 h-9 rounded-lg bg-white shadow-sm hover:bg-gray-50 font-bold text-lg transition"
                          >
                            −
                          </button>

                          <span className="w-10 text-center font-bold text-gray-800">
                            {article.quantite}
                          </span>

                          <button
                            onClick={() => ajouterAuPanier(article)}
                            className="w-9 h-9 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold text-lg transition"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Sous-total */}
                      <div className="text-left sm:text-right">
                        <p className="text-sm text-gray-500">Sous-total</p>

                        <p className="text-lg font-bold text-gray-900">
                          {(article.prix * article.quantite).toLocaleString()}{" "}
                          FCFA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Résumé de commande */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Résumé de la commande
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Articles</span>

                    <span className="font-medium">{nombreArticlesPanier}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Livraison</span>

                    <span className="text-green-600 font-medium">Gratuite</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 my-6"></div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold">Total</span>

                  <span className="text-2xl font-bold text-blue-600">
                    {totalPanier.toLocaleString()} FCFA
                  </span>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg">
                  Commander
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Panier;
