const header = document.getElementById("siteHeader");

const navItems = [
  { label: "Accueil", href: "index.html", icon: "🏠" },
  { label: "Événement à venir", href: "etape-1.html", icon: "☀️" },
  { label: "Tous les événements", href: "evenements.html", icon: "📅" },
  { label: "Infos", href: "infos.html", icon: "ℹ️" }
];

const currentPage = window.location.pathname.split("/").pop() || "index.html";

header.innerHTML = `
  <header class="site-header">
    <div class="header-main">
      <img class="header-logo" src="assets/img/blason-suzini.png" alt="Logo Suzini">

      <div class="header-title">
        <div class="header-name">
          <span class="title-white">SUZINI BT</span>
          <span class="title-pink">SUMMER TOUR</span>
        </div>
      </div>

      <img class="header-logo" src="assets/img/logo-julyana-bt.png" alt="Logo Jul'Yana BT">
    </div>

    <nav class="header-nav" aria-label="Navigation principale">
      ${navItems.map(item => `
        <a class="${currentPage === item.href ? "active" : ""}" href="${item.href}">
          <span>${item.icon}</span>
          <strong>${item.label}</strong>
        </a>
      `).join("")}
    </nav>
  </header>
`;
