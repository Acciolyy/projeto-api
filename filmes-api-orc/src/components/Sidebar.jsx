import React from "react";
import "../styles/Sidebar.css";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img
          src={logo}
          alt="Logo do site"
          onClick={handleLogoClick}
        />
      </div>
      <nav>
        <ul className="sidebar-list">
          <li>
            <a href="#now-playing">Filmes em Cartaz</a>
          </li>
          <li>
            <a href="#top-rated">Mais Bem Avaliados</a>
          </li>
          <li>
            <a href="#popular">Populares</a>
          </li>
          <li>
            <a href="#upcoming">Em Breve</a>
          </li>
          <li>
            <a href="/login" className="side-button">Login</a>
          </li>
          <li>
            <a href="/register" className="side-button">Registro</a>
          </li>
          <li>
            <a href="/favorites" className="side-button">Favoritos</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
