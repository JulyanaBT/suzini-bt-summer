import { auth, db } from "./firebase.js";
import { getRoleByUid } from "./session.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const maintenanceRef = doc(db, "settings", "maintenance");

function getPageKey(){
  const parts = window.location.pathname.split("/").filter(Boolean);

  const folder = parts.find(part => part.startsWith("etape-")) || "etape-1";
  const file = parts.at(-1) || "index.html";
  const name = file.replace(".html", "") || "index";

  return `${folder}/${name}`;
}

async function currentUserRole(){
  if(!auth.currentUser) return null;

  try{
    return await getRoleByUid(auth.currentUser.uid);
  }catch(error){
    return null;
  }
}

function isAdminRole(role){
  return ["admin", "jat", "arbitre"].includes(role);
}

function escapeHtml(value){
  return String(value || "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function showMaintenance(message){
  document.body.innerHTML = `
    <main style="
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:24px;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
      background:
        radial-gradient(circle at 10% 0%, rgba(255,216,77,.28), transparent 28%),
        radial-gradient(circle at 90% 8%, rgba(255,62,138,.18), transparent 26%),
        linear-gradient(180deg,#eaf9ff 0%,#fff4d4 52%,#ffffff 100%);
      color:#102033;
    ">
      <section style="
        width:min(520px,100%);
        border-radius:28px;
        padding:24px;
        background:rgba(255,255,255,.94);
        box-shadow:0 16px 40px rgba(16,24,40,.14);
        text-align:center;
      ">
        <div style="font-size:44px;margin-bottom:10px;">🔧</div>

        <h1 style="
          margin:0;
          font-size:32px;
          line-height:1;
          letter-spacing:-.04em;
          color:#063b72;
        ">
          Maintenance
        </h1>

        <p style="
          margin:14px 0 0;
          color:#475467;
          font-size:16px;
          line-height:1.45;
          font-weight:800;
        ">
          ${escapeHtml(message)}
        </p>

        <div style="
          margin-top:18px;
          padding:12px 14px;
          border-radius:18px;
          background:#fff7d6;
          color:#102033;
          font-size:14px;
          font-weight:900;
        ">
          Suzini BT Summer Tour
        </div>
      </section>
    </main>
  `;
}

async function checkMaintenance(){
  const pageKey = getPageKey();

  const snap = await getDoc(maintenanceRef);
  if(!snap.exists()) return;

  const data = snap.data() || {};
  if(data.enabled !== true) return;

  const pageBlocked = data.pages?.[pageKey] === true;
  if(!pageBlocked) return;

  const role = await currentUserRole();

  if(isAdminRole(role)) return;

  showMaintenance(
    data.message || "Page momentanément en maintenance. Merci de revenir dans quelques minutes."
  );
}

onAuthStateChanged(auth, async () => {
  await checkMaintenance();
});
