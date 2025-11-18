async function loadSunscreens() {
  const response = await fetch("data/sunscreens.json");
  const sunscreens = await response.json();
  return sunscreens;
}

function formatIngredientLink(ing) {
  const urlSlug = ing
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");

  return `<a href="https://incidecoder.com/ingredients/${urlSlug}" target="_blank">${ing}</a>`;
}

function displaySunscreens(list) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "sunscreen-card";

    const ingredientLinks = item.ingredients
      .map(ing => formatIngredientLink(ing))
      .join(", ");

    div.innerHTML = `
      <h2>${item.brand} – ${item.product}</h2>

      <p><strong>Type:</strong> ${item.type}</p>
      <p><strong>Niacinamide?</strong> ${item.niacinamide ?? "Unknown"}</p>
      <p><strong>Ingredients:</strong> ${ingredientLinks}</p>

      <p><strong>Rosacea Safety:</strong> ${item.rosacea_safety}</p>
      <p><em>${item.notes}</em></p>
    `;

    container.appendChild(div);
  });
}

function setupSearch(all) {
  const search = document.getElementById("search");

  search.addEventListener("input", () => {
    const term = search.value.toLowerCase();

    const filtered = all.filter(item =>
      item.brand.toLowerCase().includes(term) ||
      item.product.toLowerCase().includes(term) ||
      item.ingredients.some(ing => ing.toLowerCase().includes(term))
    );

    displaySunscreens(filtered);
  });
}

loadSunscreens().then(all => {
  displaySunscreens(all);
  setupSearch(all);
});
