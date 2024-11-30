import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "62d9b835ac72bafeede410b266b194c6", // Chave da API TMDB
    language: "pt-BR",
  },
});

export default api;
