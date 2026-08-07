import ProductCard from "./ProductCard";

function ProductList({ produits, panier, ajouterAuPanier, diminuerQuantite }) {
  return (
    <div className="bg-gray-50 min-h-screen px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Nos Produits</h2>
          <p className="text-gray-500 mt-2">
            Découvrez les dernières nouveautés de KiffStyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {produits.map((produit) => (
            <ProductCard
              key={produit.id}
              produit={produit}
              panier={panier}
              ajouterAuPanier={ajouterAuPanier}
              diminuerQuantite={diminuerQuantite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
