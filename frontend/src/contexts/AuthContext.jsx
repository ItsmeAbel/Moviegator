import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../services/firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../services/firebase";

const AuthContext = createContext();
//export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //merges the local storage with firestore
  useEffect(() => {
    if (user) {
      const localFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      if (localFavorites.length > 0) {
        const userRef = doc(db, "users", user.uid);
        setDoc(userRef, { favorites: localFavorites }, { merge: true });
        localStorage.removeItem("favorites");
      }
    }
  }, [user]);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  const logout = () => {
    signOut(auth).then(() => setUser(null));
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsub;
  }, []);

  const values = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
