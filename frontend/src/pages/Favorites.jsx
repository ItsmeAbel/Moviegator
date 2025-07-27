import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length > 0) {
    return (
      <div className="favorites">
        <h2> Your Favorits...</h2>
        <p>
          List is saved locally but you can login to save and sync your list
          across devices //Abel
        </p>
        <div className="recommend-btn-container">
        <Link to="/recommendation">
          <button className="recommend-btn"> Recommend Me</button>
        </Link>
        </div >
        <h3 className="inline-box">Movies: {favorites.length}</h3>

        <div className="movies-grid">
          {favorites.map((Movie) => (
            <MovieCard Movie={Movie} key={Movie.id} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="favorites-empty">
        <h2>No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites and they will appear here!</p>
      </div>
    );
  }
}

export default Favorites;
