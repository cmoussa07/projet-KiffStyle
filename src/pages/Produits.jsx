import ProductList from "../components/ProductList";

function Produits({ produits, panier, ajouterAuPanier, diminuerQuantite }) {
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
