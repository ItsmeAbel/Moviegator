import MovieCard from "../components/MovieCard";
import { useState } from "react";

function Home() {
  //an array of movie objects
  const movies = [
    { id: 1, title: "Avengers", release_date: "2011" },
    { id: 2, title: "Deadpool", release_date: "2016" },
    { id: 3, title: "Guardians of the galaxy", release_date: "2019" },
  ];

  //we use a hook or a state to store the value in the search bar for later use. Basics of state in react
  const [searchQuery, setSearchQuery] = useState(""); //setSearchQuery is used to assign a value to searchQuery
  //whenever a state change happens the entire component is re-renderd

  const formSubmitHandler = (e) => {
    e.preventDefault();
    alert(searchQuery);
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
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>

        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="movies-grid">
        {movies.map((Movie) => Movie.title.toLocaleLowerCase().startsWith(searchQuery) && (
          <MovieCard Movie={Movie} key={Movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
