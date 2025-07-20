import { useState } from "react";
import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({Movie}) {
  const { isFavorite, addToFavorites, removeFromFav} = useMovieContext();
  const favorite = isFavorite(Movie.id);

  function onFavoriteClick(e) {
    //e.preventDefault()
    
    if (favorite) {
        //alert(Movie.id);
      removeFromFav(Movie.id);
      
    } else {
      addToFavorites(Movie);
      //alert("added");
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${Movie.poster_path}`}
          alt={Movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h1>{Movie.title}</h1>
        <p>{Movie.release_date}</p>
      </div>
    </div>
  );
}

export default MovieCard;
