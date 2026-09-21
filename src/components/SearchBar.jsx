function SearchBar({ recherche, setRecherche }) {
  return (
    <div className="relative hidden md:block text-on-background">
      <input
        type="text"
        placeholder="Rechercher..."
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        className="bg-surface border border-surface-variant focus:border-primary rounded px-4 py-2 pl-10 text-body-md w-64 transition-colors"
      />
      <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline">
        search
      </span>
    </div>
  );
}

export default SearchBar;
