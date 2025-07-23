import "./css/App.css";
import MovieCard from "./components/MovieCard";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./contexts/MovieContext";
import Purpose from "./pages/Purpose";
import User from "./pages/User"

function App() {
  return (
    
     
        <MovieProvider>
          <div>
            <Navbar />
            <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer"><img className= "tmdb-logo" src="/tmdb.svg"></img></a>
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/purpose" element={<Purpose />} />
                <Route path="/user" element={<User />} />

              </Routes>
            </main>
          </div>
        </MovieProvider>
      
   
  );
}

function Text({ display }) {
  return <p>{display}</p>;
}

export default App;
