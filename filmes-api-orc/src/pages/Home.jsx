import React, { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import MovieList from "../components/MovieList";
import "../styles/Home.css";

const Home = () => {
  const [filmesEmCartaz, setFilmesEmCartaz] = useState([]);
  const [maisBemAvaliados, setMaisBemAvaliados] = useState([]);
  const [populares, setPopulares] = useState([]);
  const [filmesEmBreve, setfilmesEmBreve] = useState([]);
  const [consultaDeBusca, setConsultaDeBusca] = useState("");
  const [opcaoDeOrdenacao, setOpcaoDeOrdenacao] = useState("none");

  useEffect(() => {
    const buscarFilmes = async () => {
      try {
        const respostaFilmesEmCartaz = await api.get("/movie/now_playing");
        setFilmesEmCartaz(respostaFilmesEmCartaz.data.results);

        const respostaMaisBemAvaliados = await api.get("/movie/top_rated");
        setMaisBemAvaliados(respostaMaisBemAvaliados.data.results);

        const respostaPopulares = await api.get("/movie/popular");
        setPopulares(respostaPopulares.data.results);

        const respostafilmesEmBreve = await api.get("/movie/upcoming");
        setfilmesEmBreve(respostafilmesEmBreve.data.results);
      } catch (erro) {
        console.error("Erro ao buscar filmes:", erro);
      }
    };

    buscarFilmes();
  }, []);

  const filtrarFilmes = (filmes) => {
    return filmes.filter((filme) =>
      filme.title.toLowerCase().includes(consultaDeBusca.toLowerCase())
    );
  };

  const ordenarFilmes = (filmes) => {
    if (opcaoDeOrdenacao === "none") {
      return filmes;
    }
    if (opcaoDeOrdenacao === "alphabetical") {
      return [...filmes].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (opcaoDeOrdenacao === "release_date") {
      return [...filmes].sort((a, b) => {
        const dataA = new Date(a.release_date);
        const dataB = new Date(b.release_date);
        return dataA - dataB;
      });
    }
  };

  const filmesFiltradosOrdenados = (filmes) => {
    const filtrados = filtrarFilmes(filmes);
    return ordenarFilmes(filtrados);
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="home-content">
        <div className="filters">
          <input
            type="text"
            placeholder="Buscar filmes..."
            value={consultaDeBusca}
            onChange={(e) => setConsultaDeBusca(e.target.value)}
            className="search-input"
          />
          <select
            value={opcaoDeOrdenacao}
            onChange={(e) => setOpcaoDeOrdenacao(e.target.value)}
            className="sort-select"
          >
            <option value="none">Sem filtro</option>
            <option value="release_date">Ordenar por lançamento</option>
            <option value="alphabetical">Ordenar alfabeticamente</option>
          </select>
        </div>

        <section id="now-playing">
          <h1 className="home-title">Filmes em Cartaz</h1>
          <MovieList movies={filmesFiltradosOrdenados(filmesEmCartaz)} />
        </section>

        <section id="top-rated">
          <h1 className="home-title">Mais Bem Avaliados</h1>
          <MovieList movies={filmesFiltradosOrdenados(maisBemAvaliados)} />
        </section>

        <section id="popular">
          <h1 className="home-title">Populares</h1>
          <MovieList movies={filmesFiltradosOrdenados(populares)} />
        </section>

        <section id="upcoming">
          <h1 className="home-title">Em Breve</h1>
          <MovieList movies={filmesFiltradosOrdenados(filmesEmBreve)} />
        </section>
      </div>
    </div>
  );
};

export default Home;
