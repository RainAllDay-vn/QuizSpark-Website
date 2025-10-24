import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyDXWEDdW5PpXhrl9oJkNMgbjQEje5KEp3k",
  authDomain: "quizspark-f0fa7.firebaseapp.com",
  projectId: "quizspark-f0fa7",
  storageBucket: "quizspark-f0fa7.firebasestorage.app",
  messagingSenderId: "993125948903",
  appId: "1:993125948903:web:fb5cb269b86235fe3bf142",
  measurementId: "G-L6KL77J1FJ"
};

export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
