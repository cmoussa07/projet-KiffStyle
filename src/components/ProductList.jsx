import ProductCard from "./ProductCard";

function ProductList({ produits, panier, ajouterAuPanier, diminuerQuantite }) {
  return (
    <section className="bg-surface-container-lowest py-section-gap">
      <div className="max-w-container-max-width mx-auto px-gutter">
        <div className="text-center mb-margin-desktop">
          <h2 className="font-headline-lg text-headline-lg text-on-background">
            Les derniers drops
          </h2>

          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Les pièces qui vont upgrader ton style.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-gutter">
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
    </section>
  );
}

export default ProductList;
