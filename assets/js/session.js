import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

export async function login(email, password){
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function logout(){
  await signOut(auth);
}

export async function getRoleByUid(uid){
  const snap = await getDoc(doc(db, "users", uid));

  if(!snap.exists()){
    return null;
  }

  const data = snap.data() || {};

  if(data.active !== true){
    return null;
  }

  return data.role || null;
}
