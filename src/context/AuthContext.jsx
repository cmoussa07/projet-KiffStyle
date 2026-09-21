import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(null);
  const navigate = useNavigate();

  function seDeconnecter() {
    localStorage.removeItem("token");
    setUtilisateur(null);
    navigate("/connexion");
  }

  return (
    <AuthContext.Provider
      value={{ utilisateur, setUtilisateur, seDeconnecter }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
