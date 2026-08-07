import { useState } from "react";

function SearchBar({ recherche, setRecherche }) {
  return (
    <div className="max-w-3xl mx-auto my-10 px-4">
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={recherche}
        onChange={(e) => {
          setRecherche(e.target.value);
        }}
        className="w-full rounded-xl border border-gray-300 p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;
