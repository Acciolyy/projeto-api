import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Favorite.css";
import Sidebar from "../components/Sidebar";

const Favorites = () => {
  const navigate = useNavigate();
  
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setNome(storedUser.nome);
      setEmail(storedUser.email);
      setSenha(storedUser.senha);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if (isLoggedIn) {
      const storedFavorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
      setFavoriteMovies(storedFavorites);
    }
  }, [isLoggedIn]);

  const handleSave = (event) => {
    event.preventDefault();
    const updatedUser = { nome, email, senha };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Dados atualizados com sucesso!");
  };

  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favoriteMovies.filter(movie => movie.id !== movieId);
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  };

  

  const handleDeleteAccount = () => {
    const confirmation = window.confirm("Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.");
    if (confirmation) {
      localStorage.removeItem("user");
      localStorage.removeItem("favoriteMovies");
      setIsLoggedIn(false);
      alert("Conta excluída com sucesso!");
      navigate("/login");
    }
  };

  if (!isLoggedIn) {
    navigate("/login");
    return (
      <div className="message-container">
        <p>Você precisa estar logado para acessar os favoritos.</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <Sidebar />
      <div className="profile-container">
        <h2>Editar Perfil</h2>
        <form onSubmit={handleSave}>
          <label>
            Nome:
            <input 
              type="text" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
            />
          </label>
          <label>
            Email:
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </label>
          <label>
            Senha:
            <input 
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
            />
          </label>
          <button type="submit">Salvar</button>
        </form>
        
        <button onClick={handleDeleteAccount} className="delete-account-btn">
          Excluir Conta
        </button>
      </div>

      <h1>Favoritos</h1>
      <div className="favorites-list">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <div key={movie.id} className="favorite-item">
              <img 
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                alt={movie.title} 
                className="favorite-poster"
              />
              <p>{movie.title}</p>
              <button onClick={() => removeFromFavorites(movie.id)} className="remove-btn">
                Remover
              </button>
            </div>
          ))
        ) : (
          <p>Você ainda não adicionou nenhum filme aos favoritos.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
