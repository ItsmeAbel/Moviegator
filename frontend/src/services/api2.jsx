//it's a good practice to keep each api seperatley in its own file
//don't need jsx for api calls. Js is sufficient

import { useEffect } from "react";
import { useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";



//async means we gonna wait a while to get the whole result since it takes time to do so. doesn't implement lazy loading
export async function getPopularMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );
  const data = await response.json();

  return data.results;
}

//searches movies in the database. doens't implement lazy loading
export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();

  return data.results;
};

//get movie genres.
export const getGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  return data;
};


