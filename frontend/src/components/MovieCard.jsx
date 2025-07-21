import { useEffect, useState } from "react";
import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({Movie}) {
  const { isFavorite, addToFavorites, removeFromFav} = useMovieContext();
  const favorite = isFavorite(Movie.id);

  const [trailerKey, setTrailerKey] = useState(null);

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
  //useEffect(() => )
  //shows rating
  const rating = Movie.vote_average

  let ratingEmoji = "";
  if(rating >= 8) ratingEmoji = "🔥"
  else if(rating >= 6) ratingEmoji = "🌟"
  else if(rating >= 5)ratingEmoji = "🌙"
  else ratingEmoji = "🗑️"

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
        <p className="rating">{ratingEmoji} {Movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
}

export default MovieCard;
