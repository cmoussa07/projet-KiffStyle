import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

import { obtenirProduits } from "./services/produit.service.js";

import Accueil from "./pages/Accueil";
import Produits from "./pages/Produits";
import DetailProduit from "./pages/DetailProduit";
import Panier from "./pages/Panier";
import NotFound from "./pages/NotFound";

import Dashboard from "./pages/admin/Dashboard";
import ProduitsAdmin from "./pages/admin/ProduitsAdmin";
import NouveauProduit from "./pages/admin/NouveauProduit";
import ModifierProduit from "./pages/admin/ModifierProduit";

import nike from "./assets/nike.jpg";
import puma from "./assets/puma.jpg";
import casio from "./assets/casio.jpg";
import adidas from "./assets/adidas.jpg";

function App() {
  const [recherche, setRecherche] = useState("");
  const [panier, setPanier] = useState([]);
  const [produits, setProduits] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    const chargerProduits = async () => {
      try {
        const data = await obtenirProduits();

        setProduits(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des produits:", err);

        setErreur("Impossible de récupérer le produit.");
      } finally {
        setChargement(false);
      }
    };

    chargerProduits();
  }, []);

  async function ajouterProduit(produit) {
    try {
      const response = await fetch("http://localhost:3000/api/produits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produit),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const nouveauProduit = await response.json();

      setProduits((ancienProduits) => [...ancienProduits, nouveauProduit]);

      console.log("Produit créé :", nouveauProduit);
    } catch (err) {
      console.error("Erreur lors de la création du produit:", err);
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
        /* Client route */
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
              erreur={erreur}
              chargement={chargement}
            />
          }
        />
        <Route
          path="/produits/:id"
          element={
            <DetailProduit
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
        /* Admin route */
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/produits" element={<ProduitsAdmin />} />
        <Route path="/admin/produits/nouveau" element={<NouveauProduit />} />
        <Route
          path="/admin/produits/:id/modifier"
          element={<ModifierProduit />}
        />
        /* route Inconnue */
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
