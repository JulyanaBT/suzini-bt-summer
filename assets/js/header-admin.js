// assets/js/header-admin.js

import { auth } from "./firebase.js";
import { getRoleByUid } from "./session.js";

const header = document.getElementById("adminHeader");

const page = document.body.dataset.page || "index";
const step = document.body.dataset.step || "etape-1";

const currentFile = window.location.pathname.split("/").pop() || "index.html";

const params = new URLSearchParams(window.location.search);
const currentStep = params.get("step") || step;

const steps = [
  { key:"etape-1", label:"Étape 1", sub:"Americano 02/07" },
  { key:"etape-2", label:"Étape 2", sub:"Mixte 09/07" },
  { key:"etape-3", label:"Étape 3", sub:"Mixte 16/07" }
];

const tabs = [
  { key:"index", label:"Accueil", href:"index.html", icon:"🏠" },
  { key:"inscriptions", label:"Inscriptions", href:"inscriptions.html", icon:"📝" },
  { key:"participants", label:"Participants", href:"participants.html", icon:"👥" },
  { key:"tirage", label:"Tirage", href:"tirage.html", icon:"🎲" },
  { key:"programmation", label:"Planning", href:"programmation.html", icon:"📅" },
  { key:"classement", label:"Classement", href:"classement.html", icon:"🏆" },
  { key:"parametres", label:"Paramètres", href:"maintenance.html", icon:"⚙️" }
];

header.innerHTML = `
  <header class="admin-header">

    <div class="admin-header-main">
      <a href="../index.html">
        <img class="admin-header-logo" src="../assets/img/blason-suzini.png" alt="Suzini">
      </a>

      <div class="admin-header-title">
        <div class="admin-header-name">ADMIN SUMMER TOUR</div>
        <div class="admin-header-sub">Administration</div>
      </div>

      <a href="#" id="julyanaSwitch" aria-label="Basculer vers la page publique">
        <img class="admin-header-logo" src="../assets/img/logo-julyana-bt.png" alt="Jul'Yana BT">
      </a>
    </div>

    <nav class="admin-step-nav" aria-label="Choix de l'étape">
      ${steps.map(item => `
        <a class="${currentStep === item.key ? "active" : ""}" href="${currentFile}?step=${item.key}">
          <strong>${item.label}</strong>
          <span>${item.sub}</span>
        </a>
      `).join("")}
    </nav>

    <nav class="admin-tab-nav" aria-label="Navigation admin">
      ${tabs.map(item => `
        <a class="${page === item.key ? "active" : ""}" href="${item.href}?step=${currentStep}">
          <span>${item.icon}</span>
          <strong>${item.label}</strong>
        </a>
      `).join("")}
    </nav>

  </header>
`;

const julyanaSwitch = document.getElementById("julyanaSwitch");

async function canSwitchToPublic(){
  if(!auth.currentUser) return false;

  const role = await getRoleByUid(auth.currentUser.uid);
  return ["admin", "jat", "arbitre"].includes(role);
}

function publicTargetForPage(){
  const publicPages = {
    index: "",
    inscriptions: "inscriptions.html",
    participants: "participants.html",
    programmation: "programmation.html",
    classement: "classement.html",
    statistiques: "statistiques.html"
  };

  const target = publicPages[page];

  if(!target){
    return `../${currentStep}/`;
  }

  return `../${currentStep}/${target}`;
}

julyanaSwitch.addEventListener("click", async (event) => {
  event.preventDefault();

  if(!(await canSwitchToPublic())) return;

  window.location.href = publicTargetForPage();
});
