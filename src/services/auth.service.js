async function connexionUtilisateur(email, motDePasse) {
  const response = await fetch(
    "http://localhost:3000/api/utilisateurs/connexion",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        mot_de_passe: motDePasse,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur lors de la connexion");
  }

  return data;
}

export { connexionUtilisateur };
