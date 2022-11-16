// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import { getAuth } from "firebase/auth";
import { getRemoteConfig } from "firebase/remote-config";

const firebaseConfig = {
	apiKey: "AIzaSyAKsCnGkKD9lq52XLjJR0Cynjedn46_Y5I",
	authDomain: "lendsqr-fp-news-11eec.firebaseapp.com",
	projectId: "lendsqr-fp-news-11eec",
	storageBucket: "lendsqr-fp-news-11eec.appspot.com",
	messagingSenderId: "468633750146",
	appId: "1:468633750146:web:044b7a2a4b73674569c29b",
	measurementId: "G-RKW2ENZL9B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const performance = getPerformance(app);
const auth = getAuth(app);
const remoteConfig = getRemoteConfig(app);

export { app, analytics, performance, auth, remoteConfig };
