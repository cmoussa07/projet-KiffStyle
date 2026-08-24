import ProductList from "../components/ProductList";

function Produits({
  produits,
  panier,
  ajouterAuPanier,
  diminuerQuantite,
  erreur,
  chargement,
}) {
  if (chargement) {
    return (
      <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="text-6xl mb-4 animate-pulse">⏳</div>
        <p className="text-gray-500">Chargement des produits...</p>
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
      </div>
    );
  }

  return (
    <ProductList
      produits={produits}
      panier={panier}
      ajouterAuPanier={ajouterAuPanier}
      diminuerQuantite={diminuerQuantite}
    />
  );
}

export default Produits;
