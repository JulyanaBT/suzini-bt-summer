import { auth } from "./firebase.js";
import { getRoleByUid } from "./session.js";

const header = document.getElementById("siteHeader");

const navItems = [
  { label: "Accueil", href: "index.html", icon: "🏠" },
  { label: "Double mixte 09/07", href: "etape-2/", icon: "🎾" },
  { label: "Tous les événements", href: "evenements.html", icon: "📅" },
  { label: "Infos", href: "infos.html", icon: "ℹ️" }
];

const path = window.location.pathname;

const currentPage =
  path.endsWith("/etape-1/") ? "etape-1/" :
  path.endsWith("/etape-2/") ? "etape-2/" :
  path.endsWith("/etape-3/") ? "etape-3/" :
  (path.split("/").pop() || "index.html");

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

    <a href="#" id="julyanaSwitch" aria-label="Basculer vers l'administration">
      <img
        class="header-logo"
        src="assets/img/logo-julyana-bt.png"
        alt="Logo Jul'Yana Beach Tennis">
    </a>

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
const julyanaSwitch = document.getElementById("julyanaSwitch");

async function canSwitchToAdmin(){
  if(!auth.currentUser) return false;

  const role = await getRoleByUid(auth.currentUser.uid);
  return role === "admin";
}

julyanaSwitch.addEventListener("click", async (event) => {
  event.preventDefault();

  if(!(await canSwitchToAdmin())) return;

  window.location.href = "admin/index.html?step=etape-2";
});

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

function centerActiveTab(){
  if(!headerNav) return;

  const active = headerNav.querySelector("a.active");
  if(!active) return;

  const target =
    active.offsetLeft
    - (headerNav.clientWidth / 2)
    + (active.clientWidth / 2);

  const maxScroll = headerNav.scrollWidth - headerNav.clientWidth;

  headerNav.scrollTo({
    left:Math.max(0, Math.min(target, maxScroll)),
    behavior:"instant"
  });
}

function refreshHeaderNav(){
  centerActiveTab();
  updateNavHints();
}

headerNav.addEventListener("scroll", updateNavHints);

window.addEventListener("resize", refreshHeaderNav);
window.addEventListener("orientationchange", refreshHeaderNav);

window.addEventListener("load", () => {
  refreshHeaderNav();
  setTimeout(refreshHeaderNav, 150);
});

setTimeout(refreshHeaderNav, 100);
