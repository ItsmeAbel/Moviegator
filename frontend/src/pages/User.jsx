import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";
import "../css/Favorites.css"

function User() {
  const { user } = useAuth();
  const { favorites } = useMovieContext();

  if (favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Welcome, {user?.displayName}</h2>
        <div className="recommend-btn-container">
          <Link to="/recommendation">
            <button className="recommend-btn"> Recommend Me</button>
          </Link>
        </div>
        <h3>Your Favorite Movies: {favorites.length}</h3>

        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} Movie={movie} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="favorites">
        <h2>Welcome, {user?.displayName}</h2>
        <p>No favorites yet.</p>
      </div>
    );
  }
}

export default User;
