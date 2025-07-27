import { createContext, useContext, useEffect, useState } from "react";

//for usage of firebase
import { db } from "../services/firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  //import user from AuthContext
  const { user } = useAuth();

  const [favorites, setFavorites] = useState(() => {
    const storedFavs = localStorage.getItem("favorites");
    return storedFavs ? JSON.parse(storedFavs) : [];
  });

  //gets updated upon initial render
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");

    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs)); //parse converts the json list back to objects
    }
  }, []);

  //gets updated eachtime favorites is changed
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites)); //stringify converts the objects to a json list
  }, [favorites]);

  const addToFavorites = (Movie) => {
    //alert("we are here")
    setFavorites((prev) => [...prev, Movie]);
  };

  const removeFromFav = (MovieId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== MovieId));
  };

  const isFavorite = (MovieId) => {
    return favorites.some((Movie) => Movie.id === MovieId);
  };

  //keeps movies in /user always up to date
  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setFavorites(docSnap.data().favorites || []);
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, [user]);

  const setFavoritesToFirestore = async (Movie) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, { favorites: arrayUnion(Movie) }, { merge: true });
  };

  const removeFavoritesFromFirebase = async (MovieId) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    const existingFavorites = userDoc.exists() ? userDoc.data().favorites : [];

    const updatedFavorites = existingFavorites.filter((m) => m.id !== MovieId);
    await updateDoc(userRef, { favorites: updatedFavorites });
  };
  const value = {
    favorites,
    addToFavorites,
    removeFromFav,
    isFavorite,
    setFavoritesToFirestore,
    removeFavoritesFromFirebase,
  };
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
