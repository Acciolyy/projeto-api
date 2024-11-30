import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<><Sidebar /><div className="main-content" style={{ marginLeft: "250px", padding: "20px" }}><Home /></div></>} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
);

export default App;
