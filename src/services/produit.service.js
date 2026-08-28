const API_URL = "http://localhost:3000/api/produits";

async function obtenirProduits() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Erreur HTTP : ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export { obtenirProduits };
