//
//  LOAD SUNSCREENS
//
async function loadSunscreens() {
  try {
    console.log("Attempting to load sunscreens.json...");
    const response = await fetch("data/sunscreens.json");

    if (!response.ok) {
      console.error("Failed to load sunscreens.json:", response.status, response.statusText);
      return [];
    }

    const sunscreens = await response.json();
    console.log("Loaded sunscreens:", sunscreens);
    return sunscreens;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

//
//  FORMAT INGREDIENT LINKS
//
function formatIngredientLink(ing) {
  const urlSlug = ing
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");

  return `<a href="https://incidecoder.com/ingredients/${urlSlug}" target="_blank">${ing}</a>`;
}

//
//  HAZARD COLOR HELPER
//
function hazardColor(score) {
  if (score == null) return "#888";    // grey for unknown
  if (score <= 2) return "#4CAF50";    // green (low hazard)
  if (score <= 5) return "#FFC107";    // yellow (moderate)
  return "#F44336";                    // red (high hazard)
}

//
//  SORTING FUNCTION
//
function sortByBrandProduct(list) {
  return list.sort((a, b) => {
    const brandA = a.brand?.toLowerCase() ?? "";
    const brandB = b.brand?.toLowerCase() ?? "";
    const productA = a.product?.toLowerCase() ?? "";
    const productB = b.product?.toLowerCase() ?? "";

    if (brandA < brandB) return -1;
    if (brandA > brandB) return 1;
    if (productA < productA) return -1;
    if (productA > productB) return 1;
    return 0;
  });
}

//
//  DISPLAY SUNSCREENS (Homepage — NO BRAND)
//
function displaySunscreens(list) {
  if (!list) return;

  sortByBrandProduct(list);

  const container = document.getElementById("results");
  container.innerHTML = "";

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "sunscreen-card";

    const ingredientLinks =
      item.ingredients?.map(ing => formatIngredientLink(ing)).join(", ") ??
      "No ingredient list provided.";

    const ss = item.safety_scores ?? {};
    const rosacea = ss.rosacea ?? {};
    const acne = ss.acne ?? {};
    const sensitive = ss.sensitive ?? {};

    const reportLink = `https://github.com/kristimetz/kristimetz.github.io/issues/new?template=sunscreen-issue.md&title=Issue%20with%20sunscreen%3A%20${item.id}&body=**Sunscreen%20ID%3A**%20${item.id}`;

    div.innerHTML = `
      <h2>${item.product}</h2>

      <p><strong>SPF:</strong> ${item.spf ?? "Unknown"}</p>
      <p><strong>PA Rating:</strong> ${item.pa ?? "Unknown"}</p>
      <p><strong>Type:</strong> ${item.type ?? "Unknown"}</p>
      <p><strong>Texture/Finish:</strong> ${item.texture_finish ?? "Unknown"}</p>
      <p><strong>Country:</strong> ${item.country ?? "Unknown"}</p>

      <p><strong>Niacinamide?</strong> ${item.niacinamide ?? "Unknown"}</p>
      <p><strong>Barrier Support:</strong> ${item.barrier_support ?? "Unknown"}</p>
      <p><strong>Fragrance:</strong> ${item.fragrance ?? "Unknown"}</p>
      <p><strong>White Cast:</strong> ${item.white_cast ?? "Unknown"}</p>
      <p><strong>Visible Light Protection:</strong> ${item.visible_light_protection ?? "Unknown"}</p>
      <p><strong>Water Resistant:</strong> ${item.water_resistant ?? "Unknown"}</p>

      <!-- ★ HAZARD SCORE + COLOR BAR -->
      <p><strong>Hazard Score:</strong> ${item.hazard_score ?? "N/A"}</p>
      <div style="
        width: 100px;
        height: 8px;
        border-radius: 4px;
        background: ${hazardColor(item.hazard_score)};
        margin-bottom: 10px;
      "></div>
      <!-- ★ END HAZARD SCORE -->

      <details>
        <summary><strong>Safety Scores</strong></summary>

        <p><strong>Rosacea:</strong><br>
          • Stinging: ${rosacea.stinging ?? "Unknown"}<br>
          • Flushing: ${rosacea.flushing ?? "Unknown"}<br>
          • Barrier Impact: ${rosacea.barrier ?? "Unknown"}
        </p>

        <p><strong>Acne:</strong><br>
          • Comedogenicity: ${acne.comedogenicity ?? "Unknown"}<br>
          • Fungal Acne: ${acne.fungal_acne ?? "Unknown"}
        </p>

        <p><strong>Sensitive Skin:</strong><br>
          • Fragrance: ${sensitive.fragrance ?? "Unknown"}<br>
          • Essential Oils: ${sensitive.essential_oils ?? "Unknown"}<br>
          • Surfactant Strength: ${sensitive.surfactant_strength ?? "Unknown"}
        </p>
      </details>

      <details>
        <summary><strong>Ingredients</strong></summary>
        <p>${ingredientLinks}</p>
      </details>

      <p style="margin-top: 10px;">
        <a href="${reportLink}" target="_blank" rel="noopener noreferrer">
          📣 Report an Issue with This Sunscreen
        </a>
      </p>

      <p><em>${item.notes ?? ""}</em></p>
    `;

    container.appendChild(div);
  });
}

//
//  DISPLAY SUNSCREENS WITH BRAND (All-Sunscreens Page)
//
function displaySunscreensWithBrand(list) {
  if (!list) return;

  sortByBrandProduct(list);

  const container = document.getElementById("results");
  container.innerHTML = "";

  list.forEach(item => {
    const brandTitle = item.brand ? `<h3>${item.brand} – ${item.product}</h3>` : `<h3>${item.product}</h3>`;

    const div = document.createElement("div");
    div.className = "sunscreen-card";

    div.innerHTML = brandTitle;
    container.appendChild(div);
  });
}

//
//  SEARCH FUNCTION (Homepage Only)
//
function setupSearch(all) {
  const search = document.getElementById("search");
  if (!search) return;

  search.addEventListener("input", () => {
    const term = search.value.toLowerCase();

    const filtered = all.filter(item =>
      item.brand?.toLowerCase().includes(term) ||
      item.product?.toLowerCase().includes(term) ||
      item.ingredients?.some(ing => ing.toLowerCase().includes(term))
    );

    displaySunscreens(filtered);
  });
}

//
//  BRAND LIST (Homepage Only)
//
function displayBrandList(all) {
  const brandContainer = document.getElementById("brand-list");
  if (!brandContainer) return;

  const brands = [...new Set(all.map(item => item.brand))].sort();

  brandContainer.innerHTML = brands
    .map(brand => `<a href="#" data-brand="${brand}">${brand}</a>`)
    .join("");

  brandContainer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const brand = e.target.dataset.brand;
      const filtered = all.filter(item => item.brand === brand);

      displaySunscreens(filtered);
      document.getElementById("search").value = brand;
    });
  });
}

//
//  INITIALIZE PAGE
//
loadSunscreens().then(all => {
  console.log("Initializing page with:", all);

  const onAllPage = !document.getElementById("brand-list");

  if (onAllPage) {
    displaySunscreens(all);
  } else {
    displayBrandList(all);
    displaySunscreens(all);
    setupSearch(all);
  }
});
