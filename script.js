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
        `<a href="https://incidecoder.com/ingredients/${ing.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-")}" 
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
    .map(b => `<span class="brand-pill" data-brand="${b}">${b}</span>`)
    .join("");

  pillContainer.querySelectorAll(".brand-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      const brand = pill.dataset.brand;
      window.location.href = `brands.html?brand=${encodeURIComponent(brand)}`;
    });
  });
}

//
//  FULL BRAND LIST GRID
//
function buildFullBrandGrid(all) {
  const fullGrid = document.getElementById("allBrandGrid");
  if (!fullGrid) return;

  const brands = [...new Set(all.map(s => s.brand))].sort();

  fullGrid.innerHTML = brands
    .map(b => `<span class="brand-pill" data-brand="${b}">${b}</span>`)
    .join("");

  fullGrid.querySelectorAll(".brand-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      const brand = pill.dataset.brand;
      window.location.href = `brands.html?brand=${encodeURIComponent(brand)}`;
    });
  });
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
//  BRAND PAGE HANDLER
//
function loadBrandPage(all) {
  const params = new URLSearchParams(window.location.search);
  const brand = params.get("brand");

  if (!brand) return;

  const title = document.getElementById("brand-title");
  const count = document.getElementById("brand-count");

  title.textContent = brand;

  const filtered = all.filter(s => s.brand === brand);
  count.textContent = `${filtered.length} sunscreen(s) found`;

  displaySunscreens(filtered);
}

//
//  INITIALIZE PAGE
//
loadSunscreens().then(all => {
  const onBrandPage = window.location.pathname.includes("brands.html");

  if (onBrandPage) {
    loadBrandPage(all);
  } else {
    // homepage
    buildBrandPills(all);
    buildFullBrandGrid(all);
  }
});
