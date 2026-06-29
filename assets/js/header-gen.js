const header = document.getElementById("siteHeader");

const navItems = [
  { label: "Accueil", href: "index.html", icon: "🏠" },
  { label: "Événement à venir", href: "etape-1.html", icon: "☀️" },
  { label: "Tous les événements", href: "evenements.html", icon: "📅" },
  { label: "Infos", href: "infos.html", icon: "ℹ️" }
];

header.innerHTML = `
  <header class="site-header">
    <div class="header-main">
      <img class="header-logo" src="assets/img/blason-suzini.png" alt="Logo Suzini">

      <div class="header-title">
        <div class="header-kicker">Tennis Club de Suzini</div>
        <div class="header-name">Beach Tennis Summer Tour</div>
        <div class="header-sub">Été 2026 • Guyane</div>
      </div>

      <img class="header-logo" src="assets/img/logo-julyana-bt.png" alt="Logo Jul'Yana BT">
    </div>

    <nav class="header-nav">
      ${navItems.map(item => `
        <a href="${item.href}">
          <span>${item.icon}</span>
          <strong>${item.label}</strong>
        </a>
      `).join("")}
    </nav>
  </header>
`;
