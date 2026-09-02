import { NavLink, Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const linkClass = ({ isActive }) =>
  `font-bold border-b-2 transition duration-200 active:scale-95 ${
    isActive
      ? "text-secondary border-secondary"
      : "text-on-primary/80 border-transparent hover:text-secondary"
  }`;

function Header({ recherche, setRecherche, nombreArticlesPanier }) {
  return (
    <nav className="bg-primary text-on-primary font-title-md text-title-md fixed top-0 w-full z-50 shadow-md">
      <div className="flex justify-between items-center px-gutter py-4 max-w-container-max-width mx-auto">
        <Link
          to="/"
          className="font-display-lg text-display-lg font-black text-on-primary tracking-tighter active:scale-95 transition-transform"
        >
          KiffStyle
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <NavLink to="/" className={linkClass}>
            Accueil
          </NavLink>
          <NavLink to="/produits" className={linkClass}>
            Produits
          </NavLink>

          <a
            href="#"
            className="text-on-primary/80 hover:text-secondary transition duration-200 active:scale-95"
          >
            Nouveautés
          </a>
        </div>

        <div className="flex items-center gap-4">
          <SearchBar recherche={recherche} setRecherche={setRecherche} />

          <div className="flex gap-4">
            <NavLink
              to="/panier"
              className="relative hover:text-secondary transition duration-200 active:scale-95 p-2"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {nombreArticlesPanier > 0 && (
                <span className="absolute top-0 right-0 bg-secondary text-on-secondary text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {nombreArticlesPanier}
                </span>
              )}
            </NavLink>

            {/* TODO: brancher sur l'espace compte / connexion */}
            <button className="hover:text-secondary transition duration-200 active:scale-95 p-2">
              <span className="material-symbols-outlined">person</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
