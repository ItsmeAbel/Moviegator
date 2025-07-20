import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {
  const [favorites, setFavorites] = useState(() => {

    const storedFavs = localStorage.getItem("favorites") ;
    return storedFavs ? JSON.parse(storedFavs): [];
  })

  //gets updated upon initial render
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites")

    if(storedFavs){
      setFavorites(JSON.parse(storedFavs)); //parse converts the json list back to objects
    }
  }, [])

  //gets updated eachtime favorites is changed
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites)) //stringify converts the objects to a json list
  }, [favorites])

  const addToFavorites = (Movie) => {
    //alert("we are here")
    setFavorites(prev => [...prev, Movie])
  }

  const removeFromFav = (MovieId) => {
    setFavorites(prev => prev.filter(item => item.id !== MovieId))
    
  }

  const isFavorite = (MovieId) => {
    return favorites.some(Movie => Movie.id === MovieId)
  }

  const value = {
    favorites,
    addToFavorites,
    removeFromFav,
    isFavorite
  }
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
