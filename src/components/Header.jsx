import { NavLink, Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext.jsx";

import SearchBar from "./SearchBar";

const linkClass = ({ isActive }) =>
  `font-bold border-b-2 transition duration-200 active:scale-95 ${
    isActive
      ? "text-secondary border-secondary"
      : "text-on-primary/80 border-transparent hover:text-secondary"
  }`;

function Header({ recherche, setRecherche, nombreArticlesPanier }) {
  const { utilisateur, seDeconnecter } = useContext(AuthContext);

  const [menuCompteOuvert, setMenuCompteOuvert] = useState(false);

  return (
    <nav className="bg-primary text-on-primary font-title-md text-title-md fixed top-0 w-full z-50 shadow-md">
      <div className="flex justify-between items-center px-gutter py-4 max-w-container-max-width mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="font-display-lg text-display-lg font-black text-on-primary tracking-tighter active:scale-95 transition-transform"
        >
          KiffStyle
        </Link>

        {/* Navigation principale */}
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

        {/* Actions */}
        <div className="flex items-center gap-4">
          <SearchBar recherche={recherche} setRecherche={setRecherche} />

          <div className="flex items-center gap-4">
            {/* Panier */}
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

            {/* Compte */}
            <div className="relative">
              <button
                onClick={() => setMenuCompteOuvert(!menuCompteOuvert)}
                className="flex items-center gap-1 hover:text-secondary transition duration-200 active:scale-95 p-2"
                aria-label="Ouvrir le menu du compte"
              >
                <span className="material-symbols-outlined">person</span>

                {utilisateur && (
                  <span className="hidden lg:inline text-sm font-bold">
                    {utilisateur.nom}
                  </span>
                )}

                <span className="material-symbols-outlined text-sm">
                  expand_more
                </span>
              </button>

              {/* Menu déroulant */}
              {menuCompteOuvert && (
                <div className="absolute right-0 mt-3 w-56 bg-white text-gray-800 rounded-xl shadow-lg border border-gray-200 py-2">
                  {utilisateur ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="font-bold">{utilisateur.nom}</p>

                        <p className="text-sm text-gray-500 break-words">
                          {utilisateur.email}
                        </p>
                      </div>

                      <Link
                        to="/profil"
                        onClick={() => setMenuCompteOuvert(false)}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition"
                      >
                        <span className="material-symbols-outlined">
                          person
                        </span>
                        Mon profil
                      </Link>

                      <button
                        onClick={() => {
                          setMenuCompteOuvert(false);
                          seDeconnecter();
                        }}
                        className="flex items-center gap-2 w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100 transition"
                      >
                        <span className="material-symbols-outlined">
                          logout
                        </span>
                        Déconnexion
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/connexion"
                      onClick={() => setMenuCompteOuvert(false)}
                      className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition"
                    >
                      <span className="material-symbols-outlined">login</span>
                      Se connecter
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
