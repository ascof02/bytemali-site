document.getElementById("year").textContent = new Date().getFullYear();

const grid = document.getElementById("productGrid");
const filtersEl = document.getElementById("filters");
const emptyState = document.getElementById("emptyState");

const STOCK_CLASS = {
  "En stock": "instock",
  "Sur commande": "order",
  "Rupture": "out",
};

function formatPrice(n){
  return new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
}

function cardHtml(p){
  const stockCls = STOCK_CLASS[p.stock] || "order";
  const media = p.image
    ? `<img src="${p.image}" alt="${p.name}">`
    : `<span class="fallback">${p.name.charAt(0)}</span>`;
  return `
    <article class="card" data-category="${p.category}">
      <div class="card-media">${media}</div>
      <div class="card-body">
        <div class="card-cat">${p.category}${p.brand ? " · " + p.brand : ""}</div>
        <div class="card-name">${p.name}</div>
        <p class="card-desc">${p.description || ""}</p>
      </div>
      <div class="card-foot">
        <span class="card-price">${formatPrice(p.price)}</span>
        <span class="stock-badge ${stockCls}">${p.stock}</span>
      </div>
    </article>`;
}

function renderProducts(products, activeCategory){
  const filtered = activeCategory === "Tous"
    ? products
    : products.filter(p => p.category === activeCategory);

  grid.innerHTML = filtered.map(cardHtml).join("");
  emptyState.hidden = filtered.length > 0;
}

function renderFilters(products){
  const categories = ["Tous", ...new Set(products.map(p => p.category))];
  let active = "Tous";

  filtersEl.innerHTML = categories.map(c =>
    `<button class="filter-chip${c === active ? " active" : ""}" data-cat="${c}">${c}</button>`
  ).join("");

  filtersEl.querySelectorAll(".filter-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      active = btn.dataset.cat;
      filtersEl.querySelectorAll(".filter-chip").forEach(b => b.classList.toggle("active", b === btn));
      renderProducts(products, active);
    });
  });
}

fetch("data/products.json")
  .then(res => {
    if(!res.ok) throw new Error("Impossible de charger le catalogue.");
    return res.json();
  })
  .then(data => {
    const products = data.products || [];
    renderFilters(products);
    renderProducts(products, "Tous");
  })
  .catch(err => {
    grid.innerHTML = "";
    emptyState.hidden = false;
    emptyState.textContent = "Le catalogue n'a pas pu être chargé. Vérifiez que le site est bien servi via un serveur local ou en ligne (pas ouvert directement en double-clic).";
  });
