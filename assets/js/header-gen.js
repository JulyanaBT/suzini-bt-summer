const header = document.getElementById("siteHeader");

const navItems = [
  { label: "Accueil", href: "index.html", icon: "🏠" },
  { label: "Americano 02/07", href: "etape-1/", icon: "📅" },
  { label: "Tous les événements", href: "evenements.html", icon: "📅" },
  { label: "Infos", href: "infos.html", icon: "ℹ️" }
];

const currentPage = window.location.pathname.split("/").pop() || "index.html";

header.innerHTML = `
<header class="site-header">

  <div class="header-main">

    <img
      class="header-logo"
      src="assets/img/blason-suzini.png"
      alt="Logo Tennis Club de Suzini">

    <div class="header-title">
      <div class="header-name">
        <span class="title-white">SUZINI BT SUMMER TOUR</span>
      </div>
    </div>

    <img
      class="header-logo"
      src="assets/img/logo-julyana-bt.png"
      alt="Logo Jul'Yana Beach Tennis">

  </div>

  <div class="header-nav-wrap">

    <span class="header-scroll-hint left" id="navHintLeft">‹</span>

    <nav class="header-nav" id="headerNav" aria-label="Navigation principale">
      ${navItems.map(item => `
        <a
          href="${item.href}"
          class="${currentPage === item.href ? "active" : ""}">
          <span>${item.icon}</span>
          <strong>${item.label}</strong>
        </a>
      `).join("")}
    </nav>

    <span class="header-scroll-hint right" id="navHintRight">›</span>

  </div>

</header>
`;

const headerNav = document.getElementById("headerNav");
const navHintLeft = document.getElementById("navHintLeft");
const navHintRight = document.getElementById("navHintRight");

function updateNavHints(){
  if(!headerNav || !navHintLeft || !navHintRight) return;

  const maxScroll = headerNav.scrollWidth - headerNav.clientWidth;
  const currentScroll = headerNav.scrollLeft;

  if(maxScroll <= 4){
    navHintLeft.style.opacity = "0";
    navHintRight.style.opacity = "0";
    return;
  }

  navHintLeft.style.opacity = currentScroll > 6 ? "1" : "0";
  navHintRight.style.opacity = currentScroll < maxScroll - 6 ? "1" : "0";
}

headerNav.addEventListener("scroll", updateNavHints);
window.addEventListener("resize", updateNavHints);
window.addEventListener("load", updateNavHints);

setTimeout(updateNavHints, 100);
