import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Zap,
  Gauge,
  BellRing,
  ArrowUpRight,
} from "lucide-react";

/**
 * Page Connexion
 * Formulaire email/mot de passe + connexion sociale (Google/Apple).
 *
 * TODO: brancher onSubmit sur ton service d'authentification
 * (ex: services/auth.service.js) une fois le backend prêt.
 */

import { connexionUtilisateur } from "../services/auth.service.js";
import AuthContext from "../context/AuthContext";

function Connexion() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
  //   const [seSouvenir, setSeSouvenir] = useState(false);
  const { setUtilisateur } = useContext(AuthContext);
  const navigate = useNavigate();

  const gererConnexion = async (e) => {
    e.preventDefault();

    try {
      const data = await connexionUtilisateur(email, motDePasse);

      localStorage.setItem("token", data.token);
      setUtilisateur(data.utilisateur);

      navigate("/");

      console.log("Connexion réussie :", data);
    } catch (err) {
      console.error("Erreur de connexion :", err.message);
    }
  };

  return (
    <main className="pt-32 pb-8 md:pb-16 px-gutter max-w-container-max-width mx-auto w-full relative overflow-hidden">
      {/* Halos décoratifs en fond */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-4 right-10 w-72 h-72 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* ===== Colonne visuelle (masquée sur mobile) ===== */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between h-full rounded-xl bg-surface-container-low p-8 relative overflow-hidden shadow-sm">
          <div className="relative z-10 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container self-start shadow-sm">
              <Zap className="h-4 w-4" />
              <span className="font-label-bold text-label-bold uppercase tracking-wider">
                Membres VIP
              </span>
            </div>
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                DROP ALERT #049
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                Débloquez l'accès anticipé 15 minutes avant le public sur toutes
                les silhouettes limitées.
              </p>
            </div>
          </div>

          <div className="relative z-10 my-8">
            <div className="relative overflow-hidden rounded-lg shadow-md aspect-[4/3] group">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Sneaker streetwear bleu électrique sur béton"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKJP4UCIYPnQMWtOJ6OKh8lAGZAzdarhXrtW--MUUmTtUx5IjAE91xXrdo1CyYeMAnbkj0ewb4KVmG6qBqMP0ue53IliS8lxTK02rYa5R69TUmu132Bj-y2vXPJXH9A5x9JycwUtF7QyYFGSxezLV1vnFZ3_2LUXvQ_3pKo_xcVpWNdQtPaTRRhSlrRLwtjr2UlnOVIF61OQM6Y5MVLDEeCX9YZjBjAz1YRMJ9h4xepYERddz-xWaYnw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <span className="text-on-primary font-label-bold text-label-bold tracking-wide">
                  Air Pulse 'Electric Blue' Edition
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-3 pt-4 bg-surface-container-lowest/80 backdrop-blur-md rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-label-bold text-label-bold text-on-surface">
                  100% Vérifié
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Sneakers authentifiées
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                <Gauge className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-label-bold text-label-bold text-on-surface">
                  Paiement Flash
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Checkout en 1 clic
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Colonne formulaire ===== */}
        <div className="col-span-1 lg:col-span-7 flex justify-center">
          <div className="w-full max-w-xl bg-surface-container-lowest p-6 sm:p-10 rounded-xl shadow-xl flex flex-col">
            <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="font-label-bold text-label-bold uppercase tracking-widest text-primary">
                  Espace Membre
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Connexion à votre compte KiffStyle
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Accédez à vos drops exclusifs, commandes et favoris.
              </p>
            </div>

            {/* Connexion sociale rapide */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
               TODO: brancher sur ton flux OAuth Google 
              <button
                type="button"
                className="flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors active:scale-[0.98] shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                    fill="#EA4335"
                  />
                  <path
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                    fill="#4285F4"
                  />
                  <path
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.8s.7 5.1 1.9 7.5l3.7-2.9z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                    fill="#34A853"
                  />
                </svg>
                <span className="font-label-bold text-label-bold text-on-surface">
                  Continuer avec Google
                </span>
              </button>

              {/* TODO: brancher sur ton flux OAuth Apple
              {/* <button
                type="button"
                className="flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors active:scale-[0.98] shadow-sm"
              >
                <svg
                  className="w-5 h-5 fill-current text-on-surface"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.62-.75 1.04-1.8.92-2.89-.9.04-1.99.6-2.63 1.35-.58.67-.99 1.74-.85 2.78.99.08 1.98-.51 2.56-1.24z" />
                </svg>
                <span className="font-label-bold text-label-bold text-on-surface">
                  Continuer avec Apple
                </span>
              </button> 
            </div> */}

            {/* Séparateur */}
            {/* <div className="relative flex items-center justify-center my-4">
              <div className="w-full h-px bg-surface-variant" />
              <span className="absolute bg-surface-container-lowest px-4 font-label-sm text-label-sm uppercase tracking-wider text-outline">
                ou continuer avec votre email
              </span>
            </div> */}

            {/* Formulaire principal */}
            <form
              className="flex flex-col gap-5 mt-2"
              onSubmit={gererConnexion}
            >
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="font-label-bold text-label-bold text-on-surface"
                  htmlFor="email"
                >
                  Adresse e-mail
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 h-4 w-4 text-outline pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@exemple.com"
                    className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline/60"
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label
                    className="font-label-bold text-label-bold text-on-surface"
                    htmlFor="password"
                  >
                    Mot de passe
                  </label>
                  {/* TODO: brancher sur ta page/flux de réinitialisation */}
                  <Link
                    to="/mot-de-passe-oublie"
                    className="font-label-sm text-label-sm text-primary hover:text-on-primary-fixed-variant transition-colors hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 h-4 w-4 text-outline pointer-events-none" />
                  <input
                    id="password"
                    type={afficherMotDePasse ? "text" : "password"}
                    required
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md pl-11 pr-12 py-3 rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline/60"
                  />
                  <button
                    type="button"
                    aria-label="Afficher ou masquer le mot de passe"
                    onClick={() => setAfficherMotDePasse((v) => !v)}
                    className="absolute right-3 text-outline hover:text-on-surface p-1 transition-colors flex items-center justify-center"
                  >
                    {afficherMotDePasse ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Se souvenir de moi */}
              {/* <div className="flex items-center justify-between mt-1">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={seSouvenir}
                    onChange={(e) => setSeSouvenir(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary focus:ring-offset-0 bg-surface-container cursor-pointer"
                  />
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    Se souvenir de moi
                  </span>
                </label>
              </div> */}

              {/* Bouton de connexion */}
              <button
                type="submit"
                className="w-full mt-3 py-3.5 px-6 rounded-lg bg-primary-container text-on-primary font-label-bold text-label-bold flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Se connecter</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            {/* Inscription */}
            <div className="mt-8 pt-6 bg-surface-container-low rounded-lg p-4 text-center">
              <p className="font-body-md text-body-md text-on-surface-variant">
                Pas encore membre ?
              </p>
              {/* TODO: adapte le "to" à ta vraie route d'inscription */}
              <Link
                to="/inscription"
                className="inline-flex items-center gap-1.5 mt-1 font-label-bold text-label-bold text-primary hover:text-on-primary-fixed-variant transition-transform hover:scale-[1.01]"
              >
                <span>Rejoindre le club KiffStyle (Créer un compte)</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Badges de réassurance */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 text-center">
              <div className="flex items-center justify-center gap-2 text-on-surface-variant">
                <Lock className="h-4 w-4 text-tertiary" />
                <span className="font-label-sm text-label-sm">
                  Données 100% sécurisées
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 text-on-surface-variant">
                <BellRing className="h-4 w-4 text-secondary" />
                <span className="font-label-sm text-label-sm">
                  Accès prioritaire aux drops
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Connexion;
