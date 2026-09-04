import { useState } from "react";

function ProduitForm({ ajouterProduit }) {
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [stock, setStock] = useState("");
  const [categorieId, setCategorieId] = useState("");

  const gererSoumission = async (e) => {
    e.preventDefault();

    const produit = {
      nom,
      prix: Number(prix),
      stock: Number(stock),
      categorie_id: Number(categorieId),
    };

    await ajouterProduit(produit);

    setNom("");
    setPrix("");
    setStock("");
    setCategorieId("");
  };

  return (
    <form onSubmit={gererSoumission}>
      <input
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        placeholder="Nom"
      />

      <input
        type="number"
        value={prix}
        onChange={(e) => setPrix(e.target.value)}
        placeholder="Prix"
      />

      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="Stock"
      />

      <input
        type="number"
        value={categorieId}
        onChange={(e) => setCategorieId(e.target.value)}
        placeholder="ID catégorie"
      />

      <button type="submit">Ajouter</button>
    </form>
  );
}

export default ProduitForm;
