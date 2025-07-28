import "./css/App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import { useLocation } from "react-router-dom"; //used for remounting/rerendering a page upon location key change
import React, { lazy, Suspense } from "react";

const Favorites = lazy(() => import("./pages/Favorites"));
const Home = lazy(() => import("./pages/Home"));
const Navbar = lazy(() => import("./components/Navbar"));
const Purpose = lazy(() => import("./pages/Purpose"));
const User = lazy(() => import("./pages/User"));
const ProtectedRoute = lazy(() => import("./services/ProtectedRoute"));
const Recommendation = lazy(() => import("./pages/Recommendation"));

function App() {
  const location = useLocation();

  return (
    <MovieProvider>
      <div>
        <Navbar />
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
