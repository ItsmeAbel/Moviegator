import "./css/App.css";
import MovieCard from "./components/MovieCard";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./contexts/MovieContext";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <MovieProvider>
          <div>
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </main>
          </div>
        </MovieProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

function Text({ display }) {
  return <p>{display}</p>;
}

export default App;
