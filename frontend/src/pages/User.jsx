import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";

function User() {
  const { user } = useAuth();
  const {favorites} = useMovieContext();

  return (
    <div className="favorites">
      <h2>Welcome, {user?.displayName}</h2>
      <h3>Your Favorite Movies</h3>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} Movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default User;
