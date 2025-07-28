import { useEffect, useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { getMovieRecommendations } from "../services/api2";
import "../css/Recommendation.css";
import { FiRefreshCw } from "react-icons/fi";

function Recommendations() {
  const { favorites } = useMovieContext();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Reccs, setReccs] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (favorites.length === 0) {
        setRecommendations([]);
        setLoading(false);
        return;
      }

      const shuffled = [...favorites].sort(() => 0.5 - Math.random());
      const randomFavorites = shuffled.slice(0, 2);
      let allRecs = [];

      for (const movie of randomFavorites) {
        const recs = await getMovieRecommendations(movie.id);
        allRecs = [...allRecs, ...recs];
      }

      // Remove duplicates and already favorited movies
      const favoriteIds = new Set(favorites.map((m) => m.id));
      const uniqueRecs = Array.from(
        new Map(allRecs.map((m) => [m.id, m])).values()
      ).filter((m) => !favoriteIds.has(m.id));


      const sfld = [...uniqueRecs].sort(() => 0.5 - Math.random());
      setReccs(uniqueRecs)
      const randomFive = sfld.slice(0, 4);
      setRecommendations(randomFive);
      setLoading(false);
    };

    fetchRecommendations();
  }, [favorites]);

  const refreshButtonHandler = () =>{
    const sfld = [...Reccs].sort(() => 0.5 - Math.random());
      const randomFive = sfld.slice(0, 4);
      setRecommendations(randomFive);
  }
  return (
    <div className="recommendations-page">
      <h2>Recommended for You based on your favorites. Enjoy! <button onClick={refreshButtonHandler}> <FiRefreshCw style={{color: "cyan", fontSize: "24px"}}/> </button></h2>
      
      {loading ? (
        <p>Loading recommendations...</p>
      ) : recommendations.length === 0 ? (
        <p>No recommendations found. Add some favorites first!</p>
      ) : (
        <div className="movies-grid">
          {recommendations.map((movie) => (
            <MovieCard key={movie.id} Movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Recommendations;
