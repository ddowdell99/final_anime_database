import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/style.css'
import App from './App';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const DATABASE_URL = process.env.REACT_APP_DATABASE_URL

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBM2dcKZr05RYpef3lnvKQppzT9-kfhxOI",
  authDomain: "anime-database-28725.firebaseapp.com",
  projectId: "anime-database-28725",
  storageBucket: "anime-database-28725.appspot.com",
  messagingSenderId: "555432940014",
  appId: "1:555432940014:web:8517172b00d1ce01357eff",
  databaseURL: DATABASE_URL
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />

);

