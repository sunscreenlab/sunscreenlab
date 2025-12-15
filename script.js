//
//  LOAD SUNSCREENS
//
async function loadSunscreens() {
  try {
    const response = await fetch("data/sunscreens.json");

    if (!response.ok) {
      console.error("Failed to load sunscreens.json:", response.status, response.statusText);
      return [];
    }

    return await response.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

//
//  SORTING
//
function sortByBrandProduct(list) {
  return list.sort((a, b) => {
    const brandA = a.brand?.toLowerCase() ?? "";
    const brandB = b.brand?.toLowerCase() ?? "";
    const productA = a.product?.toLowerCase() ?? "";
    const productB = b.product?.toLowerCase() ?? "";

    if (brandA < brandB) return -1;
    if (brandA > brandB) return 1;
    if (productA < productB) return -1;
    if (productA > productB) return 1;
    return 0;
  });
}

//
// HAZARD COLOR
//
function hazardColor(score) {
  if (score == null) return "#888";
  if (score <= 2) return "#4CAF50";
  if (score <= 5) return "#FFC107";
  return "#F44336";
}

//
//  DISPLAY FULL SUNSCREEN CARDS
//
function displaySunscreens(list) {
  const container = document.getElementById("results");
  if (!container) return;

  sortByBrandProduct(list);
  container.innerHTML = "";

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "sunscreen-card";

    const ingredientLinks =
      item.ingredients?.map(ing => 
        `<a href="https://incidecoder.com/ingredients/${ing
          .toLowerCase()
          .replace(/[^a-z0-9 ]/g, "")
          .replace(/\s+/g, "-")}" 
          target="_blank">${ing}</a>`
      ).join(", ") || "No ingredient list provided.";

    div.innerHTML = `
      <h2>${item.brand} ${item.product}</h2>

      <p><strong>SPF:</strong> ${item.spf ?? "Unknown"}</p>
      <p><strong>Type:</strong> ${item.type ?? "Unknown"}</p>

      <p><strong>Hazard Score:</strong> ${item.hazard_score ?? "N/A"}</p>
      <div style="
        width: 100px;
        height: 8px;
        background:${hazardColor(item.hazard_score)};
        border-radius: 4px;
      "></div>

      <details>
        <summary><strong>Ingredients</strong></summary>
        <p>${ingredientLinks}</p>
      </details>
    `;

    container.appendChild(div);
  });
}

//
//  BUILD BRAND PILL LINKS (Homepage)
//
function buildBrandPills(all) {
  const pillContainer = document.getElementById("brand-pills");
  if (!pillContainer) return;

  const brands = [...new Set(all.map(s => s.brand))].sort();

  pillContainer.innerHTML = brands
    .map(
      brand =>
        `<a class="brand-pill" href="searchresults.html?q=${encodeURIComponent(brand)}">
          ${brand}
        </a>`
    )
    .join("");
}

//
//  FULL BRAND LIST GRID
//
function buildFullBrandGrid(all) {
  const fullGrid = document.getElementById("allBrandGrid");
  if (!fullGrid) return;

  const brands = [...new Set(all.map(s => s.brand))].sort();

  fullGrid.innerHTML = brands
    .map(
      brand =>
        `<a class="brand-pill" href="searchresults.html?q=${encodeURIComponent(brand)}">
          ${brand}
        </a>`
    )
    .join("");
}

//
//  SHOW/HIDE FULL BRAND GRID
//
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("showAllBrandsBtn");
  const fullGrid = document.getElementById("allBrandGrid");

  if (btn && fullGrid) {
    btn.addEventListener("click", () => {
      const isHidden = fullGrid.style.display === "none";
      fullGrid.style.display = isHidden ? "flex" : "none";
      btn.textContent = isHidden ? "Hide All Brands" : "Show All Brands";
    });
  }
});

//
//  INITIALIZE HOMEPAGE
//
loadSunscreens().then(all => {
  buildBrandPills(all);
  buildFullBrandGrid(all);
});
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

navToggle.addEventListener("click", () => {
  siteNav.classList.toggle("open");
});
