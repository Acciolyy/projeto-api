import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=62d9b835ac72bafeede410b266b194c6&language=pt-BR`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do filme:", error);
        setLoading(false);
      });

    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=62d9b835ac72bafeede410b266b194c6`)
      .then((response) => response.json())
      .then((data) => {
        setCast(data.cast.slice(0, 5));
      })
      .catch((error) => {
        console.error("Erro ao buscar elenco do filme:", error);
      });
  }, [id]);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!movie) {
    return <p>Filme não encontrado.</p>;
  }

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="moviedetails">
      <Sidebar />
      <div className="movie-details-container">
        <img src={posterUrl} alt={movie.title} className="movie-poster" />
        <h1>{movie.title}</h1>
        <div className="movie-info-container">
          <p><strong>Sinopse:</strong> {movie.overview || "Sinopse não disponível."}</p>
          <p><strong>Data de Lançamento:</strong> {movie.release_date}</p>
          <p><strong>Nota:</strong> {movie.vote_average}</p>
          <p><strong>Gênero:</strong> {movie.genres.map((genre) => genre.name).join(", ")}</p>
          <p><strong>Adicionar aos favoritos:</strong></p>
          <div className="favorite-container">
            <button className="favorite-btn"><span role="img" aria-label="favorite">&#9733;</span></button>
          </div>
        </div>
        <h2>Elenco</h2>
        <div className="cast">
          {cast.length > 0 ? (
            cast.map((actor, index) => (
              <div key={index} className="cast-member">
                <img 
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} 
                  alt={actor.name} 
                  className="actor-photo" 
                />
                <p>{actor.name}</p>
                <p>({actor.character})</p>
              </div>
            ))
          ) : (
            <p>Elenco não disponível.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
