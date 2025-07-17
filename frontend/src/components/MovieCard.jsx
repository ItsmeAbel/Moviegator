import { useState } from "react";

function MovieCard({Movie}){

    function onFavoriteClick() {

        alert('You clicked on the favorite button');

    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={Movie.url} alt={Movie.title} />
                <div className="movie-overlay">
                    <button className = "favorite-button" onClick={onFavoriteClick}>Like</button>

                </div>
            </div>
            <div className="movie-info">
                <h1>{Movie.title}</h1>
                <p>{Movie.release_date}</p>
            </div>
        </div>
        
    );
}

export default MovieCard;