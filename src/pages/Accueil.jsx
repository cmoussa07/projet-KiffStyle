import HeroSection from "../components/HeroSection";
import ProductList from "../components/ProductList";

function Accueil({ produits, panier, ajouterAuPanier, diminuerQuantite }) {
  return (
    <div>
      <HeroSection />
      <ProductList
        produits={produits}
        panier={panier}
        ajouterAuPanier={ajouterAuPanier}
        diminuerQuantite={diminuerQuantite}
      />
    </div>
  );
}

export default Accueil;
