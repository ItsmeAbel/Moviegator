import "./App.css";
import MovieCard from "./components/MovieCard"; 

function App() {
  return (
    <>
      <MovieCard Movie={{title:"adventure island", release_date : "2025-07-16"}}/>
      <MovieCard Movie={{title:"adventure room", release_date : "2025-07-16"}}/>
      <MovieCard Movie={{title:"adventure world", release_date : "2025-07-16"}}/>
    </>
  );
}

function Text({ display }) {
  return <p>{display}</p>;
}

export default App;
