// assets/js/header-infos.js

const infosHeader = document.getElementById("infosHeader");

const page = document.body.dataset.infoPage || "infos";

const items = [
  { key:"reglement", label:"Règlement", href:"reglement.html", icon:"📜" },
  { key:"restauration", label:"Restauration", href:"restauration.html", icon:"🍔" },
  { key:"acces", label:"Accès", href:"acces.html", icon:"📍" },
  { key:"contacts", label:"Contacts", href:"contacts.html", icon:"☎️" }
];

infosHeader.innerHTML = `
  <nav class="infos-subnav" aria-label="Navigation infos">
    ${items.map(item => `
      <a class="${page === item.key ? "active" : ""}" href="${item.href}">
        <span>${item.icon}</span>
        <strong>${item.label}</strong>
      </a>
    `).join("")}
  </nav>
`;
