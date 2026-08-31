async function obtenirCategories() {
  const response = await fetch("http://localhost:3000/api/categories");

  if (!response.ok) {
    throw new Error(`Erreur HTTP : ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export { obtenirCategories };
