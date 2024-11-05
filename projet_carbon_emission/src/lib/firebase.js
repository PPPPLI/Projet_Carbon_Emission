import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD0FAyv7BQ7So0bFXGPrB0tTSaKUgWmUI0",
    authDomain: "projet-carbon-emission.firebaseapp.com",
    projectId: "projet-carbon-emission",
    storageBucket: "projet-carbon-emission.firebasestorage.app",
    messagingSenderId: "787224152306",
    appId: "1:787224152306:web:59429a65aa43626705e86b",
    measurementId: "G-MC1PH0EKSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
