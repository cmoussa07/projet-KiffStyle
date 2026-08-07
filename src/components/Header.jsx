import { NavLink } from "react-router-dom";

function Header({ panier, nombreArticlesPanier }) {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        <h1 className="text-3xl font-bold">KiffStyle</h1>

        <nav className="flex gap-8 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-yellow-300 font-bold"
                  : "text-white hover:text-gray-200"
              } transition`
            }
          >
            Accueil
          </NavLink>

          <NavLink
            to="/produits"
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-yellow-300 font-bold"
                  : "text-white hover:text-gray-200"
              } transition`
            }
          >
            Produits
          </NavLink>

          <NavLink
            to="/panier"
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-yellow-300 font-bold"
                  : "text-white hover:text-gray-200"
              } transition`
            }
          >
            Panier{nombreArticlesPanier > 0 && ` (${nombreArticlesPanier})`}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
