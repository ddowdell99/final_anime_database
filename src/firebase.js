import React from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

export const firebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyBM2dcKZr05RYpef3lnvKQppzT9-kfhxOI",
        authDomain: "anime-database-28725.firebaseapp.com",
        projectId: "anime-database-28725",
        storageBucket: "anime-database-28725.appspot.com",
        messagingSenderId: "555432940014",
        appId: "1:555432940014:web:8517172b00d1ce01357eff"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    return (
        <div>firebase</div>
    )
}
