// assets/js/header-etape.js

const header = document.getElementById("siteHeaderEtape");

const page = document.body.dataset.page || "accueil";
const type = document.body.dataset.type || "americano";
const title = document.body.dataset.title || "ÉTAPE";
const date = document.body.dataset.date || "";

const navAmericano = [
  { key:"accueil", label:"Accueil", href:"etape-1.html", icon:"🏠" },
  { key:"inscription", label:"Inscription", href:"public/inscriptions.html", icon:"📝" },
  { key:"participants", label:"Participants", href:"public/participants.html", icon:"👥" },
  { key:"programmation", label:"Programmation", href:"public/programmation.html", icon:"📋" },
  { key:"classement", label:"Classement", href:"public/classement.html", icon:"🏆" },
  { key:"statistiques", label:"Statistiques", href:"public/statistiques.html", icon:"📊" }
];

const navDoubleMixte = [
  { key:"accueil", label:"Accueil", href:"etape-2.html", icon:"🏠" },
  { key:"inscription", label:"Inscription", href:"public/inscriptions.html", icon:"📝" },
  { key:"participants", label:"Participants", href:"public/participants.html", icon:"👥" },
  { key:"tirage", label:"Tirage", href:"public/tirage.html", icon:"🎲" },
  { key:"programmation", label:"Programmation", href:"public/programmation.html", icon:"📋" },
  { key:"live", label:"Matchs en direct", href:"public/matchs-direct.html", icon:"📺" },
  { key:"classement", label:"Classement", href:"public/classement.html", icon:"🏆" }
];

const navItems = type === "americano" ? navAmericano : navDoubleMixte;

header.innerHTML = `
  <header class="etape-header">
    <div class="etape-header-main">
      <img class="etape-header-logo" src="assets/img/blason-suzini.png" alt="Logo Suzini">

      <div class="etape-header-title">
        <div class="etape-header-name">${title}</div>
        <div class="etape-header-date">${date}</div>
      </div>

      <img class="etape-header-logo" src="assets/img/logo-julyana-bt.png" alt="Logo Jul'Yana BT">
    </div>

    <div class="etape-nav-wrap">
      <span class="etape-scroll-hint left" id="etapeHintLeft">‹</span>

      <nav class="etape-nav" id="etapeNav" aria-label="Navigation de l'étape">
        ${navItems.map(item => `
          <a class="${page === item.key ? "active" : ""}" href="${item.href}">
            <span>${item.icon}</span>
            <strong>${item.label}</strong>
          </a>
        `).join("")}
      </nav>

      <span class="etape-scroll-hint right" id="etapeHintRight">›</span>
    </div>
  </header>
`;

const etapeNav = document.getElementById("etapeNav");
const hintLeft = document.getElementById("etapeHintLeft");
const hintRight = document.getElementById("etapeHintRight");

function updateEtapeHints(){
  if(!etapeNav || !hintLeft || !hintRight) return;

  const maxScroll = etapeNav.scrollWidth - etapeNav.clientWidth;
  const currentScroll = etapeNav.scrollLeft;

  if(maxScroll <= 4){
    hintLeft.style.opacity = "0";
    hintRight.style.opacity = "0";
    return;
  }

  hintLeft.style.opacity = currentScroll > 6 ? "1" : "0";
  hintRight.style.opacity = currentScroll < maxScroll - 6 ? "1" : "0";
}

etapeNav.addEventListener("scroll", updateEtapeHints);
window.addEventListener("resize", updateEtapeHints);
window.addEventListener("load", updateEtapeHints);

setTimeout(updateEtapeHints, 100);
