import "./css/App.css";
import MovieCard from "./components/MovieCard";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./contexts/MovieContext";
import Purpose from "./pages/Purpose";
import User from "./pages/User";
import ProtectedRoute from "./services/ProtectedRoute";
import { useLocation } from "react-router-dom"; //used for remounting/rerendering a page upon location key change
import Recommendation from "./pages/Recommendation"
function App() {
  const location = useLocation();

  return (
    <MovieProvider>
      <div>
        <Navbar />
        <div className="tmdb-div">
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          
          <img className="tmdb-logo" src="/tmdb.svg"></img>
        </a>
        </div>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home key={location.key} />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/purpose" element={<Purpose />} />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route path = "/recommendation" element={<Recommendation />} />
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
