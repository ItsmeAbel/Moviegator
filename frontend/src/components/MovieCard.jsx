import { useEffect, useState } from "react";
import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function MovieCard({ Movie }) {
  const { isFavorite, addToFavorites, removeFromFav } = useMovieContext();
  const favorite = isFavorite(Movie.id);

  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

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

  //use effect for showing movie trailers
  const fetchTrailer = async () => {
    if (trailerKey) {
      setShowTrailer(!showTrailer); // Toggle visibility if already loaded
      return;
    }
    const res = await fetch(
      `${BASE_URL}/movie/${Movie.id}/videos?api_key=${API_KEY}`
    );
    const data = await res.json();
    const trailer = data.results.find(
      (vid) => vid.site === "YouTube" && vid.type === "Trailer"
    );
    if (trailer) {
      setTrailerKey(trailer.key);
      setShowTrailer(true);
    }
  };

  //shows rating
  const rating = Movie.vote_average;

  let ratingEmoji = "";
  if (rating >= 8) ratingEmoji = "🔥";
  else if (rating >= 6) ratingEmoji = "🌟";
  else if (rating >= 5) ratingEmoji = "🌙";
  else ratingEmoji = "🗑️";

  return (
    <div className="movie-card">
      <div className="movie-poster">
        {showTrailer && trailerKey ? (
          <iframe
            width="100%"
            height="300"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Movie Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w500${Movie.poster_path}`}
            alt={Movie.title}
          />
        )}
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
          <button className={`trailer-btn ${showTrailer ? "moved" : ""}`} onClick={fetchTrailer}>
            {showTrailer ? "🟥" : "▶"}
          </button>
        
      </div>
      <div className="movie-info">
        <h1>{Movie.title}</h1>
        <p>{Movie.release_date}</p>
        <p className="rating">
          {ratingEmoji} {Movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
