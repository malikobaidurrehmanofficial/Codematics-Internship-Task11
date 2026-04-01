import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const authService = {
  async signup(email, password, username) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        username,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        username: userCredential.user.displayName || 'User',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async logout() {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        callback({
          id: user.uid,
          email: user.email,
          username: user.displayName || 'User',
        });
      } else {
        callback(null);
      }
    });
  },

  getCurrentUser() {
    return auth.currentUser ? {
      id: auth.currentUser.uid,
      email: auth.currentUser.email,
      username: auth.currentUser.displayName || 'User',
    } : null;
  },
};
