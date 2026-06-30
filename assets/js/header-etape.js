// assets/js/header-etape.js

const header = document.getElementById("siteHeaderEtape");

const page = document.body.dataset.page || "accueil";
const type = document.body.dataset.type || "americano";
const title = document.body.dataset.title || "ÉTAPE";
const date = document.body.dataset.date || "";

const ROOT = "../";

const navAmericano = [
  { key:"accueil",       label:"Accueil",       href:"index.html",          icon:"🏠" },
  { key:"inscription",   label:"Inscription",   href:"inscriptions.html",   icon:"📝" },
  { key:"participants",  label:"Participants",  href:"participants.html",   icon:"👥" },
  { key:"programmation", label:"Programmation", href:"programmation.html",  icon:"📋" },
  { key:"classement",    label:"Classement",    href:"classement.html",     icon:"🏆" },
  { key:"statistiques",  label:"Statistiques",  href:"statistiques.html",   icon:"📊" }
];

const navDoubleMixte = [
  { key:"accueil",       label:"Accueil",       href:"index.html",          icon:"🏠" },
  { key:"inscription",   label:"Inscription",   href:"inscriptions.html",   icon:"📝" },
  { key:"participants",  label:"Participants",  href:"participants.html",   icon:"👥" },
  { key:"tirage",        label:"Tirage",        href:"tirage.html",         icon:"🎲" },
  { key:"programmation", label:"Programmation", href:"programmation.html",  icon:"📋" },
  { key:"live",          label:"Matchs",        href:"matchs-direct.html",  icon:"📺" },
  { key:"classement",    label:"Classement",    href:"classement.html",     icon:"🏆" }
];

const navItems = type === "americano"
  ? navAmericano
  : navDoubleMixte;

header.innerHTML = `
<header class="etape-header">

  <div class="etape-header-main">

    <a href="${ROOT}index.html">
      <img
        class="etape-header-logo"
        src="${ROOT}assets/img/blason-suzini.png"
        alt="Suzini">
    </a>

    <div class="etape-header-title">
      <div class="etape-header-name">
        ${title}
      </div>

      <div class="etape-header-date">
        ${date}
      </div>
    </div>

    <a href="${ROOT}index.html">
      <img
        class="etape-header-logo"
        src="${ROOT}assets/img/logo-julyana-bt.png"
        alt="Jul'Yana BT">
    </a>

  </div>

  <div class="etape-nav-wrap">

    <span class="etape-scroll-hint left" id="hintLeft">‹</span>

    <nav class="etape-nav" id="etapeNav">

      <a href="${ROOT}index.html">
        🏠
        <strong>Accueil général</strong>
      </a>

      ${navItems.map(item => `
        <a
          class="${page===item.key ? "active":""}"
          href="${item.href}">
          ${item.icon}
          <strong>${item.label}</strong>
        </a>
      `).join("")}

    </nav>

    <span class="etape-scroll-hint right" id="hintRight">›</span>

  </div>

</header>
`;

const nav = document.getElementById("etapeNav");
const left = document.getElementById("hintLeft");
const right = document.getElementById("hintRight");

function updateHints(){

  const max = nav.scrollWidth-nav.clientWidth;

  if(max<5){
    left.style.opacity=0;
    right.style.opacity=0;
    return;
  }

  left.style.opacity = nav.scrollLeft>5 ? 1 : 0;
  right.style.opacity = nav.scrollLeft<max-5 ? 1 : 0;

}

nav.addEventListener("scroll",updateHints);
window.addEventListener("resize",updateHints);

setTimeout(updateHints,100);
