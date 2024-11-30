import React from "react";
import { Link } from "react-router-dom";
import "../styles/MovieList.css";

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <Link to={`/movie/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>Lançamento: {new Date(movie.release_date).toLocaleDateString("pt-BR")}</p>
            </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieList;