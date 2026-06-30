// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
    getStorage
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";


const firebaseConfig = {

    apiKey: "AIzaSyCKxRn6aeQ5H-LkCBs5H8I_byaWcDN_wUU",

    authDomain: "suzini-bt-summer-tour.firebaseapp.com",

    projectId: "suzini-bt-summer-tour",

    storageBucket: "suzini-bt-summer-tour.firebasestorage.app",

    messagingSenderId: "4000755560",

    appId: "1:400007555560:web:2375c29d40728ba5cc7e89"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export default app;
