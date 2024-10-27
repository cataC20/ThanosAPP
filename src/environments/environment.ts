// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-R54B6nAyrSHwArhymM8CBTEFWbT4jU0",
  authDomain: "thanosapp-e38e5.firebaseapp.com",
  projectId: "thanosapp-e38e5",
  storageBucket: "thanosapp-e38e5.appspot.com",
  messagingSenderId: "426170863669",
  appId: "1:426170863669:web:71667be7578b9e261b617c",
  measurementId: "G-NY2Y8Q0DKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the environment configuration
export const environment = {
  production: false, // Cambia a true para producción
  firebaseConfig, // Exporta la configuración de Firebase
};
