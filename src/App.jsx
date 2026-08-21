import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

import Accueil from "./pages/Accueil";
import Produits from "./pages/Produits";
import DetailProduit from "./pages/DetailProduit";
import Panier from "./pages/Panier";
import NotFound from "./pages/NotFound";

import nike from "./assets/nike.jpg";
import puma from "./assets/puma.jpg";
import casio from "./assets/casio.jpg";
import adidas from "./assets/adidas.jpg";

function App() {
  const [recherche, setRecherche] = useState("");
  const [panier, setPanier] = useState([]);
  const produits = [
    {
      id: 1,
      nom: "Nike Air Max",
      prix: 45000,
      stock: 8,
      image: nike,
    },
    {
      id: 2,
      nom: "Puma RS-X",
      prix: 35000,
      stock: 0,
      image: puma,
    },
    {
      id: 3,
      nom: "Casio Vintage",
      prix: 30000,
      stock: 5,
      image: casio,
    },
    {
      id: 4,
      nom: "Adidas Superstar",
      prix: 50000,
      stock: 10,
      image: adidas,
    },
  ];

  async function ajouterProduit(produit) {
    try {
      const nouveauProduit = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(produit),
        },
      );

      if (!nouveauProduit.ok) {
        throw new Error(
          `Erreur lors de l'ajout du produit ${nouveauProduit.status}`,
        );
      }

      const data = await nouveauProduit.json();

      console.log(data);
    } catch (err) {
      console.log("Une erreur est survenue", err);
    }
  }

  const produitsFiltres = produits.filter((produit) =>
    produit.nom.toLowerCase().includes(recherche.toLowerCase()),
  );

  const nombreArticlesPanier = panier.reduce(
    (total, article) => total + article.quantite,
    0,
  );

  const ajouterAuPanier = (produit) => {
    // verifier que le produit existe
    const ProduitExiste = panier.find((item) => item.id === produit.id);

    if (ProduitExiste) {
      setPanier(
        panier.map((item) =>
          item.id === produit.id
            ? { ...item, quantite: item.quantite + 1 }
            : item,
        ),
      );
    } else {
      setPanier([...panier, { ...produit, quantite: 1 }]);
    }
  };

  const diminuerQuantite = (id) => {
    // Le produit existe déjà → on décrémente sa quantité
    setPanier(
      panier.map((item) =>
        item.id === id ? { ...item, quantite: item.quantite - 1 } : item,
      ),
    );
  };

  const supprimerArticle = (id) => {
    setPanier(panier.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header panier={panier} nombreArticlesPanier={nombreArticlesPanier} />

      <Routes>
        <Route
          path="/"
          element={
            <Accueil
              recherche={recherche}
              setRecherche={setRecherche}
              produits={produitsFiltres}
              panier={panier}
              ajouterAuPanier={ajouterAuPanier}
              diminuerQuantite={diminuerQuantite}
            />
          }
        />
        <Route
          path="/produits"
          element={
            <Produits
              produits={produits}
              panier={panier}
              ajouterAuPanier={ajouterAuPanier}
              diminuerQuantite={diminuerQuantite}
            />
          }
        />
        <Route
          path="/produits/:id"
          element={
            <DetailProduit
              produits={produits}
              panier={panier}
              ajouterAuPanier={ajouterAuPanier}
              diminuerQuantite={diminuerQuantite}
            />
          }
        />
        <Route
          path="/panier"
          element={
            <Panier
              panier={panier}
              ajouterAuPanier={ajouterAuPanier}
              diminuerQuantite={diminuerQuantite}
              supprimerArticle={supprimerArticle}
              nombreArticlesPanier={nombreArticlesPanier}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
