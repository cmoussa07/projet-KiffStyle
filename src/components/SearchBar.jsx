import { useState } from "react";

function SearchBar({ recherche, setRecherche }) {
  return (
    <div className="relative hidden md:block text-on-background">
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={recherche}
        onChange={(e) => {
          setRecherche(e.target.value);
        }}
        className="w-full rounded-xl border border-gray-300 p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline">
        search
      </span>
    </div>
  );
}

export default SearchBar;
