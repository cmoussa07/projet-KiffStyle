import { NavLink, Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header({ panier, nombreArticlesPanier }) {
  return (
    <nav className="bg-primary text-on-primary font-title-md text-title-md fixed top-0 w-full z-50 shadow-md">
      <div className="flex justify-between items-center px-gutter py-4 max-w-container-max-width mx-auto">
        <Link
          to="/"
          className={({ isActive }) =>
            `font-bold border-b-2 transition duration-200 active:scale-95
              ${
                isActive
                  ? "text-primary border-primary" // quand actif
                  : "text-secondary border-secondary hover:text-secondary"
              }`
          }
        >
          KiffStyle
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-bold border-b-2 transition duration-200 active:scale-95
              ${
                isActive
                  ? "text-primary border-primary" // quand actif
                  : "text-secondary border-secondary hover:text-secondary"
              }`
            }
          >
            Accueil
          </NavLink>
          <NavLink
            to="/produits"
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-primary border-primary"
                  : "text-secondary border-secondary hover:text-secondary"
              } transition`
            }
          >
            Produits
          </NavLink>

          <a
            href="#"
            className="text-on-primary/80 hover:text-secondary transition duration-200 active:scale-95 "
          >
            Nouveautés
          </a>
        </div>

        <div className="flex items-center gap-4">
          <SearchBar />

          <div className="flex gap-4">
            {/* TODO: brancher sur navigate("/panier") */}
            <NavLink
              to="/panier"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-primary border-primary"
                    : "text-secondary border-secondary hover:text-secondary"
                } transition`
              }
            >
              Panier{nombreArticlesPanier > 0 && ` (${nombreArticlesPanier})`}
            </NavLink>
            <button className="hover:text-secondary transition duration-200 active:scale-95 p-2">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
            {/* TODO: brancher sur l'espace compte / connexion */}
            {/* <NavLink
              to="/profil"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-primary border-primary"
                    : "text-secondary border-secondary hover:text-secondary"
                } transition`
              }
            >
              Profil
            </NavLink> */}
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
