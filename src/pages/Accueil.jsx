import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";

function Accueil({
  recherche,
  setRecherche,
  produits,
  panier,
  ajouterAuPanier,
  diminuerQuantite,
}) {
  return (
    <div>
      <HeroSection />
      <SearchBar recherche={recherche} setRecherche={setRecherche} />
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
