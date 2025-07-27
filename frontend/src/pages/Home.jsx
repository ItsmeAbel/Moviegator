import "../css/Home.css";
import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies} from "../services/api2";

function Home() {
  //we use a hook or a state to store the value in the search bar for later use. Basics of state in react
  const [searchQuery, setSearchQuery] = useState(""); //setSearchQuery is used to assign a value to searchQuery
  //whenever a state change happens the entire component is re-renderd

  //useEffects is used to avoid the list or api being called everytime the page gets rendered
  //const movies = getPopularMovies() could also work but the api would be called up on each page rendering
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); //gets more pages from the most popular movies of the day

  const [searched, hasSearched] = useState(false); //used to track if user has searched or not
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies(page);
        setMovies((prev) => [...prev, ...popularMovies]);
      } catch (error) {
        console.log(error);
        setError("Failed to load movies!");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    //trim can be used to ignore the leading empty spaces
    if (!searchQuery.trim()) {
      return;
    }
    //won't allow us to search while loading
    if (loading) return;

    setLoading(true); // we are loading while searching
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (error) {
      console.log(error);
      setError("Failed to search Movie!");
    } finally {
      setLoading(false);
      setSearchQuery(""); //- empties the search bar upon submitting
      //hasSearched(true);
    }
  };
  //we can render the movie array individually but we gonna use mapping to
  //render them dynamically instead. with mapping it doesn't matter if we have
  //10 or 100 movies to render

  //braces can be used to do an expression within a div
  //map dynamically renders movies. key is vital to interact with each object individually

  //another vital concept in react is "conditional rendering" which is a simpler if case

  //a search form to browse between movies
  return (
    <div className="home">
      <form onSubmit={formSubmitHandler} className="search-form">
        <input
          type="text"
          placeholder="Search movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            hasSearched(true);
          }}
        ></input>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="top-movies">{!searched && <h2>Top Movies Today</h2>}</div>

      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map(
            (Movie) =>
              Movie.title.toLocaleLowerCase().startsWith(searchQuery) && (
                <MovieCard Movie={Movie} key={Movie.id}/>
              )
          )}
        </div>
      )}
      {!loading && (
        <button onClick={loadMore} className="load-more-btn">
          Load More ...
        </button>
      )}
    </div>
  );
}

export default Home;
