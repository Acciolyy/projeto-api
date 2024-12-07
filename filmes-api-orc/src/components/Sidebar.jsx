import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path, sectionId = null) => {
    navigate(path);
    if (sectionId) {
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleFavoritesClick = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/favorites");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo" onClick={handleLogoClick}>
        <img src={logo} alt="Logo do site" />
      </div>
      <nav>
        <ul className="sidebar-list">
          <li>
            <button
              className="sidebar-link"
              onClick={() => handleNavigation("/", "now-playing")}
            >
              Filmes em Cartaz
            </button>
          </li>
          <li>
            <button
              className="sidebar-link"
              onClick={() => handleNavigation("/", "top-rated")}
            >
              Mais Bem Avaliados
            </button>
          </li>
          <li>
            <button
              className="sidebar-link"
              onClick={() => handleNavigation("/", "popular")}
            >
              Populares
            </button>
          </li>
          <li>
            <button
              className="sidebar-link"
              onClick={() => handleNavigation("/", "upcoming")}
            >
              Em Breve
            </button>
          </li>
          <li>
            <button
              className="side-button"
              onClick={() => handleNavigation("/login")}
            >
              Login
            </button>
          </li>
          <li>
            <button
              className="side-button"
              onClick={() => handleNavigation("/register")}
            >
              Registro
            </button>
          </li>
          <li>
            <button
              className="side-button"
              onClick={handleFavoritesClick}
            >
              Favoritos
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
